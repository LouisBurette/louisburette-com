import { badGateway, clientIp, forwardToN8n, isRateLimited, misconfigured, tooManyRequests } from '@/lib/n8nProxy';

export const dynamic = 'force-dynamic';

/** ChatSection retombe sur le lien Calendly générique si la liste est vide. */
const EMPTY = { slots: [] };

export async function GET(req: Request) {
  if (isRateLimited(clientIp(req), 'calendly')) return tooManyRequests(EMPTY);

  try {
    const res = await forwardToN8n(
      process.env.N8N_CALENDLY_WEBHOOK_URL,
      process.env.N8N_WEBHOOK_SECRET,
      { method: 'GET' },
    );
    return res ?? misconfigured(EMPTY);
  } catch {
    return badGateway(EMPTY);
  }
}
