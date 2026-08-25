document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Anno footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Chiudi il menu' : 'Apri il menu');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Apri il menu');
      });
    });
  }

  /* ---------- Animazioni al reveal (rispetta reduced motion) ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- Processa Embed Instagram se presente ---------- */
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }

  /* ---------- Stato aperto/chiuso in base agli orari reali ---------- */
  // Orari del salone: 0 = domenica ... 6 = sabato. null = chiuso.
  const hours = {
    0: null,
    1: null,
    2: [9, 19],
    3: [9, 19],
    4: [9, 19],
    5: [9, 19],
    6: [8.5, 19],
  };

  const dayNames = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  function updateOpenStatus() {
    const statusEl = document.getElementById('openStatus');
    if (!statusEl) return;

    const now = new Date();
    const day = now.getDay();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const todayHours = hours[day];

    let isOpenNow = false;
    if (todayHours) {
      isOpenNow = currentHour >= todayHours[0] && currentHour < todayHours[1];
    }

    if (isOpenNow) {
      statusEl.textContent = `Aperto ora · chiude alle ${formatHour(todayHours[1])}`;
      statusEl.classList.add('is-open');
      statusEl.classList.remove('is-closed');
    } else {
      const nextOpening = findNextOpening(day, currentHour);
      statusEl.textContent = nextOpening
        ? `Chiuso ora · apre ${nextOpening}`
        : 'Chiuso ora';
      statusEl.classList.add('is-closed');
      statusEl.classList.remove('is-open');
    }
  }

  function findNextOpening(startDay, currentHour) {
    for (let i = 0; i < 7; i++) {
      const day = (startDay + i) % 7;
      const dayHours = hours[day];
      if (!dayHours) continue;
      if (i === 0 && currentHour >= dayHours[1]) continue;
      const label = i === 0 ? 'oggi' : (i === 1 ? 'domani' : dayNames[day]);
      return `${label} alle ${formatHour(dayHours[0])}`;
    }
    return null;
  }

  function formatHour(decimalHour) {
    const h = Math.floor(decimalHour);
    const m = Math.round((decimalHour - h) * 60);
    return m === 0 ? `${h}` : `${h}:${String(m).padStart(2, '0')}`;
  }

  updateOpenStatus();

  /* ---------- Evidenzia il giorno corrente nella tabella orari ---------- */
  const hoursTable = document.getElementById('hoursTable');
  if (hoursTable) {
    const today = new Date().getDay();
    const row = hoursTable.querySelector(`tr[data-day="${today}"]`);
    if (row) row.classList.add('is-today');
  }

});
