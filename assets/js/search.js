
async function loadIndex(){ const r = await fetch('/content/search-index.json'); return r.json(); }
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}
export async function initSearch(){
  const box = document.getElementById('q'); const out = document.getElementById('results');
  if(!box || !out) return;
  const data = await loadIndex();
  function run(){
    const q = box.value.trim(); out.innerHTML = '';
    if(q.length < 2) return;
    const re = new RegExp(esc(q), 'i');
    const hits = data.filter(item => re.test(item.title) || re.test(item.text)).slice(0, 30);
    out.innerHTML = hits.map(h => `<article class="card"><h3><a href="${h.url}">${h.title}</a></h3><p>${h.snippet}</p></article>`).join('') || '<p class="tiny">No results.</p>';
  }
  box.addEventListener('input', run);
}
