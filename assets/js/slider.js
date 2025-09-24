
export function initSliders(){
  document.querySelectorAll('.slider').forEach(sl => {
    const track = sl.querySelector('.slider-track');
    const slides = sl.querySelectorAll('.slide');
    let i = 0;
    let fadeMode = sl.classList.contains('fade');
    function show(k){
      i = (k + slides.length) % slides.length;
      if(fadeMode){
        slides.forEach((el,idx)=>el.classList.toggle('active', idx===i));
      } else {
        track.style.transform = `translateX(-${i*100}%)`;
      }
      sl.querySelectorAll('.dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
    }
    const prev = sl.querySelector('.prev'); const next = sl.querySelector('.next');
    prev && prev.addEventListener('click', ()=>show(i-1));
    next && next.addEventListener('click', ()=>show(i+1));
    sl.querySelectorAll('.dot').forEach((d,idx)=>d.addEventListener('click', ()=>show(idx)));
    // autoplay (pause on hover)
    const interval = parseInt(sl.getAttribute('data-interval') || '5500', 10);
    let timer = setInterval(()=>show(i+1), interval);
    sl.addEventListener('mouseenter', ()=>clearInterval(timer));
    sl.addEventListener('mouseleave', ()=>{ timer = setInterval(()=>show(i+1), interval); });
    show(0);
  });
}
