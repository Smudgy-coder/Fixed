
export async function onRequestPost({ request, env }){
  const data = await request.json().catch(()=>({}));
  const id = crypto.randomUUID();
  const ts = new Date().toISOString();
  const rec = { id, ts, ...data };
  try{ if(env.KV_APPS) await env.KV_APPS.put(`app:${id}`, JSON.stringify(rec), { expirationTtl: 60*60*24*60 }); }catch{}
  try{ if(env.EMAIL_WEBHOOK_URL) await fetch(env.EMAIL_WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:'job_app', ...rec}) }); }catch{}
  return new Response(JSON.stringify({ ok:true, id }), { headers:{'Content-Type':'application/json'} });
}
