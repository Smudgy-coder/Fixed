// v7.2: robust map re-center controls
(function(){
  const frame = document.getElementById('sa-map');
  if(!frame) return;
  document.querySelectorAll('.city-pills button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const q = encodeURIComponent(btn.getAttribute('data-city')||'Kansas City, MO');
      frame.src = `https://www.google.com/maps?q=${q}&z=12&output=embed`;
    });
  });
})();