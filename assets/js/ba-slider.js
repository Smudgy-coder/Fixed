
(function(){
  function init(el){
    const after = el.querySelector('.ba-after');
    const handle = el.querySelector('.ba-handle');
    const dot = el.querySelector('.ba-dot');
    if(!after||!handle||!dot) return;
    let dragging=false;
    function setX(px){
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(px - r.left, r.width));
      const pct = (x / r.width) * 100;
      after.style.clipPath = `inset(0 0 0 ${100-pct}%)`;
      handle.style.left = pct + '%';
      dot.style.left   = `calc(${pct}% - 10px)`;
    }
    el.addEventListener('pointerdown',e=>{dragging=true; setX(e.clientX); el.setPointerCapture(e.pointerId);});
    el.addEventListener('pointermove',e=>{ if(dragging) setX(e.clientX); });
    el.addEventListener('pointerup',  ()=>{ dragging=false; });
    setX(el.getBoundingClientRect().left + el.clientWidth/2);
    window.addEventListener('resize', ()=>setX(el.getBoundingClientRect().left + el.clientWidth/2));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.ba-compare').forEach(init);
  });
})();
