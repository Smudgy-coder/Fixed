
function $(s, r=document){return r.querySelector(s)}
async function send(url, payload){
  const token = localStorage.getItem('ADMIN_TOKEN') || '';
  const res = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}, body:JSON.stringify(payload)});
  const txt = await res.text();
  return {ok:res.ok, status:res.status, body:txt};
}
export function initAdmin(){
  const t = $('#token'); const save = $('#save-token');
  save.addEventListener('click', ()=>{ localStorage.setItem('ADMIN_TOKEN', t.value.trim()); alert('Token saved in this browser.'); });
  $('#post-blog').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const payload = {slug:data.slug, title:data.title, date:data.date, excerpt:data.excerpt, body:data.body};
    const r = await send('/api/blog', payload);
    alert((r.ok?'Saved: ':'Error: ')+r.status+' '+r.body);
  });
  $('#post-review').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const payload = {name:data.name, stars:Number(data.stars||5), quote:data.quote, city:data.city};
    const r = await send('/api/reviews', payload);
    alert((r.ok?'Saved: ':'Error: ')+r.status+' '+r.body);
  });
}
