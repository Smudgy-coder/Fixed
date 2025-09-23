
export const onRequestPost = async ({ request, env }) => {
  try{
    const data = await request.json();
    const body = new URLSearchParams({
      To: env.TWILIO_TO || "",
      From: env.TWILIO_FROM || "",
      Body: `New lead: ${data.name||''} ${data.phone||''} ${data.service||''} ${data.zip||''}`
    });
    if(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM && env.TWILIO_TO){
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method:'POST',
        headers:{'Authorization':'Basic '+btoa(env.TWILIO_ACCOUNT_SID+':'+env.TWILIO_AUTH_TOKEN),'Content-Type':'application/x-www-form-urlencoded'},
        body
      });
      return new Response(await res.text(), { status: res.status });
    }else{
      return new Response('SMS disabled (missing env)', { status: 200 });
    }
  }catch(e){
    return new Response('Bad request', { status: 400 });
  }
};
