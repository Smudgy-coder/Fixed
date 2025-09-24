
function money(n){return `$${n.toFixed(0)}`;}
function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
function calcMowing(inputs){
  const sqft = Number(inputs.sqft)||0;
  const base = 42; const addPer1k = 5.5;
  const extra = (Math.max(sqft-5000,0)/1000)*addPer1k;
  let price = base + extra;
  if(inputs.freq==='biweekly') price *= 1.18;
  if(inputs.freq==='onetime') price *= 1.3;
  if(inputs.narrow==='yes') price += 6;
  if(inputs.hills==='yes') price += 6;
  if(inputs.bagging==='yes') price += 8;
  return clamp(price,38,300);
}
function bundles(total){ // Good/Better/Best 3 tiers
  const good = total * 0.95;
  const better = total * 1.05;
  const best = total * 1.2;
  return [
    ['Good', `$${good.toFixed(0)}`],
    ['Better', `$${better.toFixed(0)}`],
    ['Best', `$${best.toFixed(0)}`],
  ];
}
function patio(i){const sqft=Number(i.patio_sqft)||0; let p = sqft*((i.material==='pavers'?28:12)+(i.material==='pavers'&&i.edge==='yes'?2:0)); if(i.demo==='yes') p+=3.2*sqft; if(i.lighting==='yes') p+=14*(sqft/50); return p;}
function concrete(i){const sqft=Number(i.concrete_sqft)||0; let p=sqft*9.5; if(i.thickness==='6in') p*=1.25; if(i.rebar==='yes') p+=sqft*1.8; return p;}
function drain(i){const lf=Number(i.drain_lf)||0; let ppf=28; if(i.depth==='deep') ppf+=6; if(i.catch==='yes') ppf+=12; return lf*ppf;}
function screen(i){const sqft=Number(i.screen_sqft)||0; let psf=i.structure==='pergola'?40:65; if(i.roof==='metal') psf+=6; return sqft*psf;}
function beds(i){const sqft=Number(i.bed_sqft)||0; let psf=i.media==='rock'?4.2:2.0; let labor=i.media==='rock'?4.8:2.8; return sqft*(psf+labor);}
function renderOut(el, lines){ el.innerHTML = lines.map(([label, val])=>`<div class="estimate-line"><span>${label}</span><span>${val}</span></div>`).join('') + `<p class="tiny">Rough planning ranges. Site visit required for a firm, itemized quote.</p>`; }

document.addEventListener('DOMContentLoaded',()=>{
  const out = document.getElementById('estimate-output');
  const mowForm = document.getElementById('mowing-estimator');
  if(mowForm){
    const compute=()=>{
      const d=Object.fromEntries(new FormData(mowForm).entries());
      const price=calcMowing(d);
      renderOut(out, [['Mowing (per visit)', `$${(price*0.95).toFixed(0)}–$${(price*1.15).toFixed(0)}`], ...bundles(price)]);
      const att=document.getElementById('attach'); if(att){att.value = `Mowing ~ $${(price*0.95).toFixed(0)}–$${(price*1.15).toFixed(0)} per visit (${d.freq}, ${d.sqft||'N/A'} sqft).`; }
    };
    mowForm.addEventListener('input', compute); compute();
  }
  const projForm = document.getElementById('project-estimator');
  if(projForm){
    const compute=()=>{
      const d=Object.fromEntries(new FormData(projForm).entries());
      const type=d.type;
      let total=0; if(type==='patio') total=patio(d); else if(type==='concrete') total=concrete(d); else if(type==='drainage') total=drain(d); else if(type==='screen') total=screen(d); else if(type==='beds') total=beds(d);
      const lines = [[`${type[0].toUpperCase()+type.slice(1)} Project`, `$${(total*0.9).toFixed(0)}–$${(total*1.25).toFixed(0)}`], ...bundles(total)];
      renderOut(out, lines);
      const att=document.getElementById('attach'); if(att){att.value += ` ${type} ~ $${(total*0.9).toFixed(0)}–$${(total*1.25).toFixed(0)}.`;}
    };
    projForm.addEventListener('input', compute); compute();
  }
});
