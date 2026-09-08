/**
 * Proxy serveur vers les webhooks n8n.
 *
 * Le chat tourne dans le navigateur d'un site public : tout secret envoyé au
 * client est lisible (source, onglet réseau). Les webhooks n8n sont donc
 * appelés depuis ces routes serveur, qui seules détiennent le secret partagé.
 * Côté n8n les webhooks exigent ce secret, ce qui les rend injoignables
 * directement.
 *
 * Le secret protège n8n, pas ces routes : elles restent publiques et non
 * authentifiées. Le compteur ci-dessous est ce qui borne leur usage.
 */

/** Budget par défaut : large, calé sur une conversation humaine normale. */
const DEFAULT_LIMIT = { max: 60, windowMs: 10 * 60 * 1000 };

/**
 * Compteur glissant par IP. En mémoire, donc propre à chaque instance
 * serverless tiède : une rafale répartie sur plusieurs instances peut dépasser
 * le seuil global. C'est un garde-fou de coût, pas une garantie stricte ; le
 * secret partagé reste ce qui empêche l'accès direct à n8n.
 */
const hits = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const fwd = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  return request.headers.get('x-real-ip') || fwd || 'unknown';
}

export function isRateLimited(
  ip: string,
  bucket = 'default',
  limit: { max: number; windowMs: number } = DEFAULT_LIMIT,
): boolean {
  const now = Date.now();
  for (const [key, times] of hits) {
    const kept = times.filter(t => now - t < limit.windowMs);
    if (kept.length) hits.set(key, kept);
    else hits.delete(key);
  }
  // Le bucket sépare les quotas : saturer le chat ne doit pas fermer l'envoi
  // d'email, et inversement.
  const key = `${bucket}:${ip}`;
  const seen = hits.get(key) || [];
  if (seen.length >= limit.max) return true;
  seen.push(now);
  hits.set(key, seen);
  return false;
}

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

/** Réponses d'erreur neutres : ne divulguent ni l'URL n8n ni le détail de l'échec. */
export const tooManyRequests = (fallback: unknown) => json(fallback, 429, { 'Retry-After': '600' });
export const badGateway = (fallback: unknown) => json(fallback, 502);
export const misconfigured = (fallback: unknown) => json(fallback, 500);

/**
 * Lit le corps JSON en refusant ce qui dépasse `maxBytes`, avant parsing.
 * Empêche qu'un transcript gonflé artificiellement parte vers n8n puis vers
 * l'API Anthropic, qui facture au token.
 */
export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > maxBytes) return null;

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return null;
  }
  if (raw.length > maxBytes) return null;

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Relaie la requête vers n8n en ajoutant le secret partagé.
 * Retourne null si la configuration serveur est incomplète.
 */
export async function forwardToN8n(
  url: string | undefined,
  secret: string | undefined,
  init: { method: 'GET' | 'POST'; body?: string },
): Promise<Response | null> {
  if (!url || !secret) return null;

  const headers: Record<string, string> = { 'X-Webhook-Secret': secret };
  if (init.body) headers['Content-Type'] = 'application/json';

  const upstream = await fetch(url, {
    method: init.method,
    headers,
    body: init.body,
    signal: AbortSignal.timeout(60_000),
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
