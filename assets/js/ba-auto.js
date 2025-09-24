
// ba-auto.js — progressive enhancement for Before/After, phone, and radius text
(function(){
  function injectCssOnce(href){
    if(!document.querySelector('link[href="'+href+'"]')){
      var l=document.createElement('link'); l.rel='stylesheet'; l.href=href; document.head.appendChild(l);
    }
  }
  function buildSlider(imgBefore, imgAfter){
    var wrap=document.createElement('div'); wrap.className='ba-compare';
    var i1=imgBefore.cloneNode(true); var i2=imgAfter.cloneNode(true); i2.classList.add('ba-after');
    var handle=document.createElement('div'); handle.className='ba-handle';
    var dot=document.createElement('i'); dot.className='ba-dot'; handle.appendChild(dot);
    var lb=document.createElement('div'); lb.className='ba-label before'; lb.textContent='Before';
    var la=document.createElement('div'); la.className='ba-label after'; la.textContent='After';
    wrap.appendChild(i1); wrap.appendChild(i2); wrap.appendChild(handle); wrap.appendChild(lb); wrap.appendChild(la);
    wrap.style.overflow = 'visible';
    return wrap;
  }
  function enhanceBeforeAfter(){
    injectCssOnce('/assets/css/ba-slider.css');
    // if JS for slider isn't present, add minimal inline logic
    if(!window.__BA_MINI__){
      window.__BA_MINI__=true;
      document.addEventListener('pointerdown', function(){}); // ensure passive listeners
      // init routine (simplified from ba-slider.js)
      function init(el){
        var after = el.querySelector('.ba-after');
        var handle = el.querySelector('.ba-handle');
        var dot = el.querySelector('.ba-dot');
        if(!after||!handle||!dot) return;
        var dragging=false;
        function setX(px){
          var r = el.getBoundingClientRect();
          var x = Math.max(0, Math.min(px - r.left, r.width));
          var pct = (x / r.width) * 100;
          after.style.clipPath = 'inset(0 0 0 ' + (100-pct) + '%)';
          handle.style.left = pct + '%';
          dot.style.left   = 'calc(' + pct + '% - 10px)';
        }
        el.addEventListener('pointerdown',function(e){dragging=true; setX(e.clientX); el.setPointerCapture && el.setPointerCapture(e.pointerId);});
        el.addEventListener('pointermove',function(e){ if(dragging) setX(e.clientX); });
        el.addEventListener('pointerup',function(){ dragging=false; });
        setX(el.getBoundingClientRect().left + el.clientWidth/2);
        window.addEventListener('resize', function(){ setX(el.getBoundingClientRect().left + el.clientWidth/2); });
      }
      document.addEventListener('DOMContentLoaded', function(){
        document.querySelectorAll('.ba-compare').forEach(init);
      });
    }
    // Find headings that say "Before / after" then the next sibling with two images
    var heading = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5')).find(h => /before\s*\/\s*after/i.test(h.textContent || ''));
    if(!heading) return;
    // find images near heading (same section or next siblings)
    var scope = heading.parentElement;
    var imgs = Array.from(scope.querySelectorAll('img'));
    if(imgs.length < 2){
      // try next siblings
      var sib = heading.nextElementSibling;
      while(sib && imgs.length < 2){
        imgs = imgs.concat(Array.from(sib.querySelectorAll('img')));
        sib = sib.nextElementSibling;
      }
    }
    if(imgs.length >= 2){
      var slider = buildSlider(imgs[0], imgs[1]);
      imgs[0].parentElement.insertBefore(slider, imgs[0]);
      imgs[0].remove(); imgs[1] && imgs[1].remove();
    }
  }

  function fixPhone(){
    // Replace placeholders like +1 (XXX) XXX-XXXX or "call ." with the real phone
    var REAL = '816-815-1659';
    // Text replacement
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes=[]; var re=/\(\s*XXX\s*\)\s*XXX[^\d]*XXXX|call\s*\./i;
    while(walker.nextNode()){ nodes.push(walker.currentNode); }
    nodes.forEach(function(n){
      if(re.test(n.nodeValue)){
        n.nodeValue = n.nodeValue.replace(re, 'call ' + REAL);
      }
    });
    // Update tel: links if they look blank
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
      if(/x|X/.test(a.href)) a.href = 'tel:+18168151659';
    });
  }

  function fixRadiusCopy(){
    // Normalize any "20–25" or "20-25" miles to "35 miles"
    var re = /(20\s*[–-]\s*25\s*miles?)/gi;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes=[];
    while(walker.nextNode()){ nodes.push(walker.currentNode); }
    nodes.forEach(function(n){
      if(re.test(n.nodeValue)){
        n.nodeValue = n.nodeValue.replace(re, '35 miles');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    try { enhanceBeforeAfter(); } catch(e){}
    try { fixPhone(); } catch(e){}
    try { fixRadiusCopy(); } catch(e){}
  });
})();
