
export function initTOC(){
  const toc = document.getElementById('toc'); if(!toc) return;
  const links = [...toc.querySelectorAll('a')];
  const map = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function onScroll(){
    let current = 0;
    map.forEach((el, i)=>{const rect = el.getBoundingClientRect(); if(rect.top < 120) current = i;});
    links.forEach((a,i)=>a.classList.toggle('active', i===current));
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}
