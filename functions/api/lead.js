
export async function onRequestPost({ request, env }) {
  const data = await request.json().catch(() => ({}));
  const id = crypto.randomUUID();
  const ts = new Date().toISOString();
  const ip = request.headers.get('CF-Connecting-IP');
  const ua = request.headers.get('user-agent');
  const rec = { id, ts, ip, ua, ...data };

  // Optional Turnstile check
  try{
    if(env.TURNSTILE_SECRET && data.cf_turnstile_response){
      const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: data.cf_turnstile_response, remoteip: ip });
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
      const out = await res.json();
      if(!out.success) return new Response(JSON.stringify({ ok:false, error:'turnstile_failed' }), { status:400, headers:{'Content-Type':'application/json'} });
    }
  }catch{}

  try{ if(env.KV_LEADS) await env.KV_LEADS.put(`lead:${id}`, JSON.stringify(rec), { expirationTtl: 60*60*24*60 }); }catch{}
  try{ if(env.EMAIL_WEBHOOK_URL) await fetch(env.EMAIL_WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(rec) }); }catch{}
  return new Response(JSON.stringify({ ok:true, id }), { headers:{'Content-Type':'application/json'} });
}
