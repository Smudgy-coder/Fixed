
async function getFile(path){
  const res = await fetch(path); if(!res.ok) throw new Error('not found'); return res.json();
}
export async function onRequestGet(){
  try{ const data = await getFile('/content/jobs.json'); return new Response(JSON.stringify(data), { headers:{'Content-Type':'application/json'} }); }
  catch{ return new Response(JSON.stringify({jobs:[]}), { headers:{'Content-Type':'application/json'} }); }
}
