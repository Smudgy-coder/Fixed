export function initBackToTop(){
  const btn = document.createElement('div');
  btn.className='back-to-top';
  btn.innerHTML = `<button class="btn btn-ghost" aria-label="Back to top">↑ Top</button>`;
  document.body.appendChild(btn);
  const toggle = ()=>{ if(window.scrollY>400) btn.classList.add('show'); else btn.classList.remove('show'); };
  window.addEventListener('scroll', toggle, {passive:true}); toggle();
  btn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
}