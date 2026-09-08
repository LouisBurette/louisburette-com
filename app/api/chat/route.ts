import { badGateway, clientIp, forwardToN8n, isRateLimited, misconfigured, readJsonBody, tooManyRequests } from '@/lib/n8nProxy';

export const dynamic = 'force-dynamic';

/** Forme attendue par ChatSection quand l'appel n'aboutit pas. */
const EMPTY = { message: '', isComplete: false, choices: [], showSlots: false };

const MAX_BYTES = 256 * 1024;
const MAX_MESSAGES = 60;
const MAX_CONTENT = 8000;
const LANGS = new Set(['fr', 'en', 'es']);

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req), 'chat')) return tooManyRequests(EMPTY);

  const payload = await readJsonBody(req, MAX_BYTES);
  if (!payload) return badGateway(EMPTY);

  // Chaque message est renvoyé tel quel à l'API Anthropic, qui facture au
  // token : on borne le nombre et la taille avant de relayer.
  const raw = Array.isArray(payload.messages) ? payload.messages : [];
  const messages = raw
    .slice(-MAX_MESSAGES)
    .filter((m): m is { role: string; content: string } =>
      !!m && typeof m === 'object' &&
      ((m as { role?: unknown }).role === 'user' || (m as { role?: unknown }).role === 'assistant') &&
      typeof (m as { content?: unknown }).content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT) }));

  if (!messages.length) return badGateway(EMPTY);

  const lang = typeof payload.lang === 'string' && LANGS.has(payload.lang) ? payload.lang : 'fr';

  try {
    const res = await forwardToN8n(
      process.env.N8N_CHAT_WEBHOOK_URL,
      process.env.N8N_WEBHOOK_SECRET,
      { method: 'POST', body: JSON.stringify({ messages, lang }) },
    );
    return res ?? misconfigured(EMPTY);
  } catch {
    return badGateway(EMPTY);
  }
}
