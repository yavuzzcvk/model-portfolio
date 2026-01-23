const backendBaseUrl = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://backend.test/api';

export async function GET() {
  const normalizedBase = backendBaseUrl.replace(/\/$/, '');

  try {
    const res = await fetch(`${normalizedBase}/settings`, { cache: 'no-store' });

    if (!res.ok) {
      const body = await safeJson(res);
      return Response.json(
        { error: body?.error || 'Ayarlar alınamadı' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Settings fetch failed:', error);
    return Response.json({ error: 'Sunucuya ulaşılamadı' }, { status: 500 });
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
