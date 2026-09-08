import { badGateway, clientIp, forwardToN8n, isRateLimited, misconfigured, readJsonBody, tooManyRequests } from '@/lib/n8nProxy';

export const dynamic = 'force-dynamic';

const EMPTY = { ok: false };

const MAX_BYTES = 256 * 1024;
const MAX_TRANSCRIPT = 60;
const MAX_CONTENT = 8000;
const MAX_SUMMARY = 8000;
const LANGS = new Set(['fr', 'en', 'es']);

/** Cette route déclenche un envoi Gmail vers une adresse fournie par
 *  l'appelant : quota bien plus serré que le chat. */
const LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

/** Doublon volontaire de la validation faite dans n8n : on ne relaie pas une
 *  adresse malformée jusqu'au nœud Gmail. */
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req), 'complete', LIMIT)) return tooManyRequests(EMPTY);

  const payload = await readJsonBody(req, MAX_BYTES);
  if (!payload) return badGateway(EMPTY);

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  if (!EMAIL_RE.test(email) || email.length > 254) return badGateway(EMPTY);

  const transcript = (Array.isArray(payload.transcript) ? payload.transcript : [])
    .slice(-MAX_TRANSCRIPT)
    .filter((m): m is { role: string; content: string } =>
      !!m && typeof m === 'object' &&
      ((m as { role?: unknown }).role === 'user' || (m as { role?: unknown }).role === 'assistant') &&
      typeof (m as { content?: unknown }).content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT) }));

  // On ne relaie que les champs attendus par le workflow : un client ne doit
  // pas pouvoir injecter d'autres clés dans le corps envoyé à n8n.
  const body = JSON.stringify({
    email,
    transcript,
    summary: typeof payload.summary === 'string' ? payload.summary.slice(0, MAX_SUMMARY) : '',
    lang: typeof payload.lang === 'string' && LANGS.has(payload.lang) ? payload.lang : 'fr',
  });

  try {
    const res = await forwardToN8n(
      process.env.N8N_COMPLETE_WEBHOOK_URL,
      process.env.N8N_WEBHOOK_SECRET,
      { method: 'POST', body },
    );
    return res ?? misconfigured(EMPTY);
  } catch {
    return badGateway(EMPTY);
  }
}
