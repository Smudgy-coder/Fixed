export function initLightbox(){
  const overlay = document.createElement('div'); overlay.className='lightbox-overlay';
  overlay.innerHTML = `<button class="btn btn-accent btn-sm close">Close ✕</button><img alt="">`;
  document.body.appendChild(overlay);
  const img = overlay.querySelector('img'); const close=overlay.querySelector('.close');
  function open(src,alt){ img.src=src; img.alt=alt||''; overlay.classList.add('open'); }
  function hide(){ overlay.classList.remove('open'); img.src=''; }
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) hide(); });
  document.querySelectorAll('a[data-lightbox]').forEach(a=>{
    a.addEventListener('click', (e)=>{ e.preventDefault(); open(a.getAttribute('href'), a.getAttribute('data-alt')); });
  });
}