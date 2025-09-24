
function toNumber(v, fallback=0){ const n = Number(v); return isNaN(n)?fallback:n; }
function tiers(total){
  return {
    good: Math.round(total*0.95),
    better: Math.round(total*1.05),
    best: Math.round(total*1.2)
  };
}
export async function onRequestGet({ request }){
  const url = new URL(request.url);
  const type = url.searchParams.get('type')||'patio';
  const p = Object.fromEntries(url.searchParams.entries());
  let total=0;
  switch(type){
    case 'patio': {
      const sqft = toNumber(p.sqft);
      total = sqft * ( (p.material==='concrete'?12:28) + (p.edge==='yes' && p.material!=='concrete'?2:0) );
      if(p.demo==='yes') total += 3.2*sqft;
      if(p.lighting==='yes') total += 14*(sqft/50);
      break;
    }
    case 'concrete': { const sqft=toNumber(p.sqft); total=sqft*9.5; if(p.thickness==='6in') total*=1.25; break; }
    case 'drainage': { const lf=toNumber(p.lf); total = lf*(p.depth==='deep'?34:28) + (p.catch==='yes'?12*lf:0); break; }
    case 'screen': { const sqft=toNumber(p.sqft); total = sqft*(p.structure==='pergola'?40:65) + (p.roof==='metal'?6*sqft:0); break; }
    case 'beds': { const sqft=toNumber(p.sqft); total = sqft*((p.media==='rock'?9:4.8)); break; }
    default: total=0;
  }
  const t = tiers(total);
  return new Response(JSON.stringify({ ok:true, type, ...t }), { headers:{'Content-Type':'application/json'} });
}
