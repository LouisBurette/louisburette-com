export async function GET() {
  try {
    const res = await fetch(process.env.N8N_CALENDLY_WEBHOOK_URL!, {
      method: 'GET',
    });
    if (!res.ok) return Response.json({ error: 'Service unavailable' }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Service unavailable' }, { status: 502 });
  }
}
