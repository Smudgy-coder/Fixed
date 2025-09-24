export function initWizard(){
  const openers = document.querySelectorAll('[data-open-wizard]');
  if(!openers.length) return;
  const modal = document.createElement('div');
  modal.className='modal';
  modal.innerHTML = `<div class="sheet">
    <h2>Start Your Quote (2 steps)</h2>
    <p class="tiny">Two quick steps — we’ll text/call to confirm.</p>
    <div class="steps"><div class="dot active"></div><div class="dot"></div></div>
    <form class="lead-form" id="wiz-form">
      <div class="step step-1">
        <label><span>Service</span>
          <select name="service" required>
            <option value="">Select a service…</option>
            <option>Patios & Pavers</option><option>Drainage</option><option>Landscaping</option>
            <option>Screen Rooms</option><option>Concrete</option><option>Lawn Care</option><option>Snow & Ice</option>
          </select>
        </label>
        <label><span>ZIP</span><input name="zip" inputmode="numeric" placeholder="64106" required></label>
      </div>
      <div class="step step-2" hidden>
        <label><span>Name</span><input name="name" required placeholder="First & Last"></label>
        <label><span>Phone</span><input name="phone" required inputmode="tel" placeholder="(816) 815‑1659"></label>
        <label class="full"><span>Details</span><textarea name="details" rows="4" placeholder="Tell us about your project…"></textarea></label>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-ghost prev" disabled>Back</button>
        <button type="button" class="btn btn-accent next">Next</button>
        <button type="submit" class="btn btn-accent submit" hidden>Send</button>
        <button type="button" class="btn btn-ghost close">Cancel</button>
      </div>
    </form>
    <div class="success" hidden>
      <h3>Thanks!</h3>
      <p>We received your info and will reach out shortly. If you don’t hear from us, call <a href="tel:+18168151659">(816) 815‑1659</a>.</p>
      <button class="btn btn-accent close">Close</button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  const dots=[...modal.querySelectorAll('.dot')];
  const steps=[...modal.querySelectorAll('.step')];
  const prev=modal.querySelector('.prev'); const next=modal.querySelector('.next');
  const submit=modal.querySelector('.submit'); const closeBtns=modal.querySelectorAll('.close');
  const form=modal.querySelector('#wiz-form'); const success=modal.querySelector('.success');
  let i=0;
  function show(k){i=k;steps.forEach((s,idx)=>s.hidden = idx!==i);dots.forEach((d,idx)=>d.classList.toggle('active',idx<=i));prev.disabled=i===0;next.hidden=i===steps.length-1;submit.hidden=i!==steps.length-1;}
  show(0);
  openers.forEach(btn=>btn.addEventListener('click',()=>modal.classList.add('open')));
  closeBtns.forEach(b=>b.addEventListener('click',()=>modal.classList.remove('open')));
  prev.addEventListener('click', ()=>show(Math.max(0,i-1)));
  next.addEventListener('click', ()=>{
    const s1 = steps[0].querySelector('select[name=service]');
    const z1 = steps[0].querySelector('input[name=zip]');
    if(i===0 && (!s1.value || !z1.value)){ steps[0].querySelector('select, input').focus(); return; }
    show(Math.min(steps.length-1,i+1));
  });
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Graceful static fallback: open a prefilled mailto
    const data = new FormData(form);
    const subject = encodeURIComponent(`Quote: ${data.get('service')} in ${data.get('zip')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}
Phone: ${data.get('phone')}
Service: ${data.get('service')}
ZIP: ${data.get('zip')}
Details: ${data.get('details')||''}`);
    window.location.href = `mailto:hello@simpleprojectkc.com?subject=${subject}&body=${body}`;
    form.hidden = true; success.hidden = false;
  });
}
// add skip wizard buttons if present
document.addEventListener('click', (e)=>{
  if(e.target && e.target.matches('[data-skip-wizard]')){
    window.location.href = '/quote.html';
  }
});