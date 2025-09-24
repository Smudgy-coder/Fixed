
// Before/After slider logic (no inline scripts; CSP-safe)
export function initBeforeAfter(){
  document.querySelectorAll('.ba').forEach(ba => {
    const before = ba.querySelector('.ba-before');
    const divider = ba.querySelector('.ba-divider');
    const knob = ba.querySelector('.ba-knob');
    if (!before || !divider || !knob) return;

    let pct = 50, dragging = false;

    function setPct(p){
      pct = Math.max(0, Math.min(100, p));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      divider.style.left = pct + '%';
      knob.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
    setPct(50);

    function pos(e){
      const r = ba.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      return (x / r.width) * 100;
    }

    function down(e){ dragging = true; setPct(pos(e)); e.preventDefault(); }
    function move(e){ if (!dragging) return; setPct(pos(e)); }
    function up(){ dragging = false; }

    ba.addEventListener('mousedown', down);
    ba.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    // Keyboard support on knob
    knob.setAttribute('tabindex', '0');
    knob.setAttribute('role', 'slider');
    knob.setAttribute('aria-valuemin', '0');
    knob.setAttribute('aria-valuemax', '100');
    knob.setAttribute('aria-valuenow', '50');
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') setPct(pct - 5);
      if (e.key === 'ArrowRight') setPct(pct + 5);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfter();
});
