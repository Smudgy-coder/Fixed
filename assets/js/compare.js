export function initCompare(){
  document.querySelectorAll('.compare').forEach(root=>{
    const after=root.querySelector('.after'); const handle=root.querySelector('.handle'); const knob=root.querySelector('.knob');
    function set(x){ const r=root.getBoundingClientRect(); const p=Math.max(0,Math.min(1,(x-r.left)/r.width)); after.style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`; handle.style.left=`${p*100}%`; knob.style.left=`calc(${p*100}% - 12px)`;}
    set(root.getBoundingClientRect().left + root.clientWidth*0.5);
    const move=e=>set(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    root.addEventListener('mousemove',move,{passive:true}); root.addEventListener('touchmove',move,{passive:true});
  });
}