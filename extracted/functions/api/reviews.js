
async function getKV(env, key, fallback){
  try{ if(env.KV_REVIEWS){ const v = await env.KV_REVIEWS.get(key); if(v) return JSON.parse(v); } }catch{}
  return fallback;
}
async function putKV(env, key, value){
  try{ if(env.KV_REVIEWS){ await env.KV_REVIEWS.put(key, JSON.stringify(value)); } }catch{}
}
export async function onRequestGet({ env }){
  const data = await getKV(env, 'reviews', null) || (await fetch('/content/reviews.json').then(r=>r.json()).catch(()=>({reviews:[]})));
  return new Response(JSON.stringify(data), { headers:{'Content-Type':'application/json'} });
}
export async function onRequestPost({ request, env }){
  const auth = request.headers.get('Authorization')||'';
  if(!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return new Response('Unauthorized', { status:401 });
  const payload = await request.json().catch(()=>null);
  if(!payload || !payload.text) return new Response('Bad Request', { status:400 });
  const current = await getKV(env, 'reviews', { reviews:[] });
  current.reviews.unshift(payload);
  await putKV(env, 'reviews', current);
  return new Response(JSON.stringify({ ok:true }), { headers:{'Content-Type':'application/json'} });
}
