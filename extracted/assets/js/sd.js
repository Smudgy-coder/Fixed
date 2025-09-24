export function injectJSONLD(obj){
  const el=document.createElement('script'); el.type='application/ld+json'; el.textContent=JSON.stringify(obj);
  document.head.appendChild(el);
}