
async function getKV(env, key, fallback){
  try{ if(env.KV_BLOG){ const v = await env.KV_BLOG.get(key); if(v) return JSON.parse(v); } }catch{}
  return fallback;
}
async function putKV(env, key, value){
  try{ if(env.KV_BLOG){ await env.KV_BLOG.put(key, JSON.stringify(value)); } }catch{}
}
export async function onRequestGet({ request, env }){
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const posts = await getKV(env, 'posts', null) || (await fetch('/content/blog.json').then(r=>r.json()).catch(()=>({posts:[]})));
  if(slug){
    const post = posts.posts.find(p=>p.slug===slug);
    return new Response(JSON.stringify({ ok: !!post, post }), { headers:{'Content-Type':'application/json'} });
  }
  return new Response(JSON.stringify({ ok:true, posts: posts.posts||[] }), { headers:{'Content-Type':'application/json'} });
}
export async function onRequestPost({ request, env }){
  const auth = request.headers.get('Authorization')||'';
  if(!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return new Response('Unauthorized', { status:401 });
  const payload = await request.json().catch(()=>null);
  if(!payload || !payload.slug) return new Response('Bad Request', { status:400 });
  const current = await getKV(env, 'posts', { posts:[] });
  const idx = current.posts.findIndex(p=>p.slug===payload.slug);
  if(idx>=0) current.posts[idx]=payload; else current.posts.unshift(payload);
  await putKV(env, 'posts', current);
  return new Response(JSON.stringify({ ok:true }), { headers:{'Content-Type':'application/json'} });
}
