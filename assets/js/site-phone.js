// Populate any [data-phone] elements with the business phone
const PHONE="816-815-1659", TEL="+18168151659";
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-phone]').forEach(el=>{ el.textContent = PHONE; });
  document.querySelectorAll('a[data-phone-link]').forEach(a=>{ a.href = 'tel:' + TEL; a.textContent = PHONE; });
});
