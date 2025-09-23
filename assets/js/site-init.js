import { initReveal } from '/assets/js/reveal.js'; import { initHoverFX } from '/assets/js/hoverfx.js';
initReveal(); initHoverFX();
if(document.querySelector('.compare')) import('/assets/js/compare.js').then(m=>m.initCompare());
if(document.querySelector('[data-lightbox]')) import('/assets/js/lightbox.js').then(m=>m.initLightbox());
if(document.querySelector('.slider')) import('/assets/js/slider.js').then(m=>m.initSliders && m.initSliders());
import { initWizard } from '/assets/js/wizard.js'; initWizard();
import { initZipCheck } from '/assets/js/zip-check.js'; initZipCheck();

import { initBackToTop } from '/assets/js/ux.js'; initBackToTop();
document.addEventListener('DOMContentLoaded', ()=>{
  import('/assets/js/slider.js').then(m=>m.initSliders && m.initSliders());
});
window.addEventListener('load', ()=>{
  import('/assets/js/slider.js').then(m=>m.initSliders && m.initSliders()); // second chance init
});
