export function initZipCheck(){
  const field=document.querySelector('[data-zip-check]'); if(!field) return;
  const ok = new Set([
    // KC MO core
    64101,64102,64105,64106,64108,64109,64110,64111,64112,64113,64114,64116,64117,64118,64119,64120,64123,64124,64125,64126,64127,64128,64129,64130,64131,64132,64133,64134,64136,64137,64138,64139,64145,64146,64147,64149,64150,64151,64152,64153,64154,64155,64156,64157,64158,
    // JOCO / KS side (representative)
    66202,66203,66204,66205,66206,66207,66208,66209,66210,66211,66212,66213,66214,66215,66216,66217,66218,66219,66220,66221,66223,66224,66226,66227,
    66062,66061,66030,66085,66012,66250,
    // Clay/Platte/others (sample)
    64068,64029,64030,64055,64064,64081,64082,64083
  ]);
  field.addEventListener('input', ()=>{
    const val = parseInt(field.value,10);
    if(Number.isFinite(val)){
      field.setCustomValidity(ok.has(val) ? '' : 'This ZIP may be outside our typical radius. We might still help — send anyway!');
    } else {
      field.setCustomValidity('');
    }
  });
}