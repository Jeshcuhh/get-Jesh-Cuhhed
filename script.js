(function () {
  const nav = document.querySelector('[data-nav]');

  function setScrolled() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // Hide nav on scroll down, show on scroll up (matches index.html)
  let lastNavY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!nav) return;
    const y = window.scrollY;
    if (y > lastNavY && y > 120) {
      nav.classList.add('nav--hidden');     // scrolling down
    } else {
      nav.classList.remove('nav--hidden');  // scrolling up
    }
    lastNavY = y;
  }, { passive: true });

  document.querySelectorAll('[data-toggle]').forEach((header) => {
    header.addEventListener('click', () => {
      const protocol = header.closest('[data-protocol]');
      if (!protocol) return;
      const isOpen = protocol.classList.contains('open');

      document.querySelectorAll('[data-protocol].open').forEach((item) => {
        if (item !== protocol) {
          item.classList.remove('open');
          const itemToggle = item.querySelector('.protocol__toggle');
          if (itemToggle) {
            itemToggle.setAttribute('aria-expanded', 'false');
            itemToggle.setAttribute('aria-label', 'Expand protocol');
          }
        }
      });

      protocol.classList.toggle('open', !isOpen);
      const toggle = header.querySelector('.protocol__toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(!isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Expand protocol' : 'Collapse protocol');
      }
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Start the page scrolled down a little on load
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 80, behavior: 'auto' });
    });
  });
})();


/* index1 header component */
(function () {
  var navEl = document.querySelector('.nav');
  if (!navEl) return;

  // Mega menu (desktop hover + click)
  var navItems = navEl.querySelectorAll('.navitem');
  var scrim = document.getElementById('page-scrim');
  if (navItems.length && scrim) {
    function setMenu(name) {
      navItems.forEach(function (it) { it.classList.toggle('is-open', it.dataset.menu === name); });
      navEl.querySelectorAll('.mega').forEach(function (m) { m.classList.toggle('is-open', m.dataset.panel === name); });
      scrim.classList.toggle('is-active', !!name);
    }
    scrim.addEventListener('click', function () { setMenu(null); });
    navItems.forEach(function (it) {
      it.addEventListener('mouseenter', function () { setMenu(it.dataset.menu); });
      var btn = it.querySelector('.navitem__btn');
      if (btn) btn.addEventListener('click', function () {
        setMenu(it.classList.contains('is-open') ? null : it.dataset.menu);
      });
    });
    navEl.addEventListener('mouseleave', function () { setMenu(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(null); });
  }

  // Account login modal
  var acctModal = document.getElementById('account-modal');
  var acctOpen = document.getElementById('account-open');
  if (acctModal && acctOpen) {
    var openAcct = function () {
      acctModal.classList.add('is-open');
      var f = document.getElementById('acct-email');
      if (f) setTimeout(function () { f.focus(); }, 60);
    };
    var closeAcct = function () { acctModal.classList.remove('is-open'); };
    acctOpen.addEventListener('click', openAcct);
    acctModal.querySelectorAll('[data-acct-close]').forEach(function (el) {
      el.addEventListener('click', closeAcct);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAcct(); });
  }

  // Mobile drawer
  var drawer = document.getElementById('drawer');
  var burger = navEl.querySelector('.nav__burger');
  if (drawer && burger) {
    burger.addEventListener('click', function () { drawer.classList.add('is-open'); });
    var close = drawer.querySelector('.drawer__close');
    if (close) close.addEventListener('click', function () { drawer.classList.remove('is-open'); });
    drawer.querySelectorAll('button.drawer__toggle').forEach(function (b) {
      b.addEventListener('click', function () { b.closest('.drawer__group').classList.toggle('is-open'); });
    });
  }

  // Rotating announcement bar
  var barEl = document.getElementById('topbar-msg');
  if (barEl) {
    var barMsgs = [
      '<a href="#">Discover our Gift Card</a>',
      'Guest services Monday to Saturday, 10am to 7pm EST',
      '<a href="../portfolio/booking.html">Book a private appointment</a>',
      'Complimentary shipping, returns and gift wrapping on all orders'
    ];
    var barIdx = 0;
    window.rotateBar = function (dir) {
      barIdx = (barIdx + dir + barMsgs.length) % barMsgs.length;
      barEl.innerHTML = barMsgs[barIdx];
    };
    setInterval(function () { window.rotateBar(1); }, 6000);
  }
})();

/* ── Product carousel (coverflow-style; used on protocol pages) ── */
(function () {
  const track = document.querySelector('[data-carousel-track]');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('[data-slide]'));
  const total = slides.length;
  if (!total) return;
  let active = Math.min(2, total - 1); // center the third slide when present

  function render() {
    slides.forEach((slide, i) => {
      let diff = i - active;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      slide.setAttribute('data-pos', Math.abs(diff) <= 2 ? String(diff) : 'hidden');
    });
  }
  function next() { active = (active + 1) % total; render(); }
  function prev() { active = (active - 1 + total) % total; render(); }

  document.querySelector('[data-carousel-next]')?.addEventListener('click', next);
  document.querySelector('[data-carousel-prev]')?.addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  let startX = null;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    startX = null;
  });

  render();
})();

/* ── Silk fabric canvas (decorative animated background) ── */
(function () {
  // Inject the canvas once, before any page content.
  if (document.getElementById('silk')) return;
  const wrap = document.createElement('div');
  wrap.className = 'silk-canvas';
  wrap.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  canvas.id = 'silk';
  wrap.appendChild(canvas);
  document.body.insertBefore(wrap, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const silkColors = [
    { r: 212, g: 200, b: 192, a: 0.55 },
    { r: 201, g: 173, b: 116, a: 0.32 },
    { r: 214, g: 170, b: 163, a: 0.42 },
    { r: 217, g: 206, b: 198, a: 0.50 },
    { r: 201, g: 130, b: 125, a: 0.22 },
    { r: 233, g: 222, b: 212, a: 0.48 },
    { r: 165, g: 130, b: 100, a: 0.20 },
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  }

  function drawSilk(t) {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    // mostly-ivory base wash so the silk reads as paper with faint folds
    ctx.fillStyle = '#FDF8F4';
    ctx.fillRect(0, 0, W, H);

    let seed = 7;
    function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    const layers = 9;
    for (let i = 0; i < layers; i++) {
      const col = silkColors[i % silkColors.length];
      const progress = i / layers;
      const sway = Math.sin(t * 0.0003 + i * 0.7) * W * 0.012 * (1 + progress);
      const flow = t * 0.0002 + i * 0.5;

      ctx.save();
      ctx.globalAlpha = 0.5;   // keep folds faint so the field stays mostly ivory
      ctx.beginPath();
      // folds concentrated toward the right side of the field
      const startX = W * (0.52 + progress * 0.16) + sway;
      const startY = -H * 0.05;
      ctx.moveTo(startX, startY);

      const folds = 4 + Math.floor(rand() * 3);
      let cx = startX, cy = startY;
      for (let f = 0; f < folds; f++) {
        const segH = H / folds;
        const nextY = cy + segH + (rand() - 0.5) * segH * 0.3;
        const waveAmp = W * (0.08 + rand() * 0.12) * (1 + progress * 0.5);
        const cp1x = cx + waveAmp * Math.sin(f * 1.2 + progress * 2 + flow);
        const cp1y = cy + segH * 0.33;
        const cp2x = cx - waveAmp * 0.5 * Math.cos(f * 0.8 + progress + flow);
        const cp2y = cy + segH * 0.66;
        const nextX = cx + (rand() - 0.4) * W * 0.06 + sway * 0.4;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextX, nextY);
        cx = nextX; cy = nextY;
      }

      ctx.lineTo(W + 50, H + 50);
      ctx.lineTo(W + 50, -50);
      ctx.closePath();

      const grad = ctx.createLinearGradient(startX - W * 0.2, 0, W, H);
      grad.addColorStop(0,   `rgba(${col.r + 18}, ${col.g + 18}, ${col.b + 18}, ${col.a * 0.6})`);
      grad.addColorStop(0.3, `rgba(${col.r},      ${col.g},      ${col.b},      ${col.a})`);
      grad.addColorStop(0.6, `rgba(${col.r - 15}, ${col.g - 20}, ${col.b - 25}, ${col.a * 1.1})`);
      grad.addColorStop(1,   `rgba(${col.r + 10}, ${col.g + 5},  ${col.b},      ${col.a * 0.7})`);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 245, 230, ${0.05 + progress * 0.03})`;
      ctx.lineWidth = (1.2 + progress) * dpr;
      ctx.stroke();
      ctx.restore();
    }
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); if (reduceMotion) drawSilk(0); }, 150);
  });

  resize();
  if (reduceMotion) {
    drawSilk(0);
  } else {
    requestAnimationFrame(function loop(now) { drawSilk(now); requestAnimationFrame(loop); });
  }
})();

/* ── Ensure every page shows at least two leaf sprigs ── */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  // left-aligned leaf sprig (matches the hero leaf)
  function makeSprigLeft() {
    var d = document.createElement('div');
    d.className = 'sprig-divider sprig-divider--l';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML =
      '<svg class="sprig" viewBox="0 0 150 28" width="150" height="28">' +
      '<path d="M3 14 H145" stroke="currentColor" stroke-width="1" opacity=".5"/>' +
      '<g fill="currentColor" opacity=".6">' +
      '<ellipse cx="30" cy="8" rx="8" ry="3.4" transform="rotate(-28 30 8)"/>' +
      '<ellipse cx="30" cy="20" rx="8" ry="3.4" transform="rotate(28 30 20)"/>' +
      '<ellipse cx="62" cy="7" rx="9" ry="3.8" transform="rotate(-26 62 7)"/>' +
      '<ellipse cx="62" cy="21" rx="9" ry="3.8" transform="rotate(26 62 21)"/>' +
      '<ellipse cx="96" cy="8" rx="8.5" ry="3.5" transform="rotate(-27 96 8)"/>' +
      '<ellipse cx="96" cy="20" rx="8.5" ry="3.5" transform="rotate(27 96 20)"/>' +
      '<ellipse cx="126" cy="14" rx="7" ry="3" transform="rotate(-16 126 14)"/>' +
      '</g></svg>';
    return d;
  }
  // right-aligned finished-divider sprig
  function makeSprigRight() {
    var d = document.createElement('div');
    d.className = 'sprig-divider sprig-divider--r';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML =
      '<svg class="sprig" viewBox="0 0 200 24" width="200" height="24" style="transform:scaleX(-1);">' +
      '<path d="M4 12 H196" stroke="currentColor" stroke-width="1" opacity=".45"/>' +
      '<g fill="currentColor" opacity=".55">' +
      '<ellipse cx="60" cy="7" rx="9" ry="3.6" transform="rotate(-26 60 7)"/>' +
      '<ellipse cx="60" cy="17" rx="9" ry="3.6" transform="rotate(26 60 17)"/>' +
      '<ellipse cx="100" cy="6" rx="10" ry="4" transform="rotate(-24 100 6)"/>' +
      '<ellipse cx="100" cy="18" rx="10" ry="4" transform="rotate(24 100 18)"/>' +
      '<ellipse cx="140" cy="7" rx="9" ry="3.6" transform="rotate(-26 140 7)"/>' +
      '<ellipse cx="140" cy="17" rx="9" ry="3.6" transform="rotate(26 140 17)"/>' +
      '</g></svg>';
    return d;
  }
  ready(function () {
    var have = document.querySelectorAll('.sprig').length;
    var need = 2 - have;
    if (need <= 0) return;

    // bottom sprig (right-aligned) — just above the footer (or end of page)
    if (need >= 1) {
      var footer = document.querySelector('footer');
      if (footer && footer.parentNode) footer.parentNode.insertBefore(makeSprigRight(), footer);
      else document.body.appendChild(makeSprigRight());
      need--;
    }
    // top sprig (left-aligned) — just below the nav/header (or top of page)
    if (need >= 1) {
      var anchor = document.querySelector('nav') || document.querySelector('header');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(makeSprigLeft(), anchor.nextSibling);
      else document.body.insertBefore(makeSprigLeft(), document.body.firstChild);
    }
  });
})();
