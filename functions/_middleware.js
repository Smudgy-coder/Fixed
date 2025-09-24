
export async function onRequest(context) {
  const res = await context.next();
  const headers = new Headers(res.headers);
  headers.set('X-Content-Type-Options','nosniff');
  headers.set('X-Frame-Options','DENY');
  headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  headers.set('Permissions-Policy','geolocation=(), microphone=(), camera=()');
  headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload');
  // Simple AB cookie
  const cookie = context.request.headers.get('Cookie') || '';
  if(!cookie.includes('ab=')){
    headers.append('Set-Cookie', `ab=${Math.random()<0.5?'A':'B'}; Path=/; Max-Age=2592000; SameSite=Lax`);
  }
  return new Response(res.body, { status: res.status, headers });
}
