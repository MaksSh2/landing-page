const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const siteHeader = document.getElementById('siteHeader');
const themeStorageKey = 'landing-theme';

/* ---------------- MOBILE MENU ---------------- */

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';

    menuBtn.setAttribute('aria-expanded', !expanded);
    mobileNav.classList.toggle('is-open');
  });

  // закрытие меню при клике на ссылку
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', false);
    });
  });
}

/* ---------------- THEME SWITCH ---------------- */

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(themeStorageKey, theme);
  themeBtn.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
}

// загрузка темы из памяти
const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme) setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------------- HEADER ON SCROLL ---------------- */

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // эффект прозрачности шапки
  if (currentScroll > 30) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }

  // скрытие при скролле вниз
  if (currentScroll > lastScroll && currentScroll > 200) {
    siteHeader.classList.add('header--hidden');
  } else {
    siteHeader.classList.remove('header--hidden');
  }

  lastScroll = currentScroll;
});

/* ---------------- SCROLL PROGRESS BAR ---------------- */

const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;
  progressBar.style.width = progress + '%';
});

/* ---------------- REVEAL ANIMATION ---------------- */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const delay = entry.target.dataset.delay || 0;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ---------------- MOUSE LIGHT EFFECT ---------------- */

document.addEventListener('mousemove', e => {
  document.querySelectorAll('.feature, .hero-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', x + 'px');
    card.style.setProperty('--y', y + 'px');
  });
});