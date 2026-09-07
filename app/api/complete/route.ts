export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(process.env.N8N_COMPLETE_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET! },
      body: JSON.stringify(body),
    });
    if (!res.ok) return Response.json({ error: 'Service unavailable' }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Service unavailable' }, { status: 502 });
  }
}
