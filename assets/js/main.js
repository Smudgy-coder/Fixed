
// main.js — site-wide enhancements
function optimizeImages(){
  const origin = location.origin;
  document.querySelectorAll('img').forEach(img=>{
    const src = img.getAttribute('src')||'';
    if(src.startsWith('assets/img/') || src.startsWith('/assets/img/')){
      const clean = src.startsWith('/')?src.slice(1):src;
      const url = `${origin}/cdn-cgi/image/width=1280,quality=76,f=auto/${clean}`;
      img.setAttribute('src', url);
      img.setAttribute('loading','lazy');
      img.setAttribute('decoding','async');
    }
  });
}
function enhanceLeadForms(){
  document.querySelectorAll('.lead-form[data-enhanced]').forEach(form=>{
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try{
        const r = await fetch('/api/lead', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
        // fire-and-forget SMS (optional)
        fetch('/api/lead-sms', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}).catch(()=>{});
        if(r.ok){
          form.innerHTML = '<p class="lead">Thanks! We\\'ll text or call you shortly to confirm details and schedule a site visit.</p>';
        }else{
          form.insertAdjacentHTML('beforeend','<p class="tiny" style="color:#fca5a5">There was a problem submitting. Please call (816) 815‑1659.</p>');
        }
      }catch(err){
        form.insertAdjacentHTML('beforeend','<p class="tiny" style="color:#fca5a5">Network error. Please call (816) 815‑1659.</p>');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  optimizeImages();
  enhanceLeadForms();
});
