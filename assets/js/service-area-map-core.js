export function initServiceAreaMap(){
  const root=document.querySelector('#sa-svg-root'); if(!root) return;
  const svg=root.querySelector('svg'); const layer=root.querySelector('#sa-layer');
  const zi=root.querySelector('[data-zoom-in]'); const zo=root.querySelector('[data-zoom-out]'); const zr=root.querySelector('[data-zoom-reset]');
  const buttons=root.querySelectorAll('[data-pan-to]');
  let scale=1, tx=0, ty=0;
  const apply=()=>layer.setAttribute('transform',`translate(${tx},${ty}) scale(${scale})`);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const screenToWorld=(x,y)=>({x:(x-tx)/scale,y:(y-ty)/scale});
  function doZoom(f,cx=svg.clientWidth/2,cy=svg.clientHeight/2){
    const before=screenToWorld(cx,cy); scale=clamp(scale*f,0.6,3.5);
    const after=screenToWorld(cx,cy); tx+=cx-(after.x*scale+tx); ty+=cy-(after.y*scale+ty); apply();
  }
  let drag=false, lx=0, ly=0;
  svg.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;});
  window.addEventListener('mouseup',()=>drag=false);
  svg.addEventListener('mousemove',e=>{ if(!drag) return; tx+=e.clientX-lx; ty+=e.clientY-ly; lx=e.clientX; ly=e.clientY; apply();},{passive:true});
  svg.addEventListener('wheel',e=>{ e.preventDefault(); doZoom(e.deltaY<0?1.1:0.9,e.clientX,e.clientY); },{passive:false});
  zi&&zi.addEventListener('click',()=>doZoom(1.2)); zo&&zo.addEventListener('click',()=>doZoom(0.83)); zr&&zr.addEventListener('click',()=>{scale=1;tx=0;ty=0;apply();});
  buttons.forEach(btn=>btn.addEventListener('click',()=>{ const t=root.querySelector(btn.getAttribute('data-pan-to')); if(!t) return; const x=parseFloat(t.getAttribute('data-x')); const y=parseFloat(t.getAttribute('data-y')); tx=svg.clientWidth/2-x*scale; ty=svg.clientHeight/2-y*scale; apply(); }));
  apply();
}