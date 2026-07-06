export async function GET() {
  const res = await fetch(process.env.N8N_CALENDLY_WEBHOOK_URL!, {
    method: 'GET',
  });
  const data = await res.json();
  return Response.json(data);
}
