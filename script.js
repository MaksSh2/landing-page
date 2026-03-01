const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const siteHeader = document.getElementById('siteHeader');
const themeStorageKey = 'landing-theme';

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('is-open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const setTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.dataset.theme = isLight ? 'light' : 'dark';

  if (themeBtn) {
    themeBtn.textContent = isLight ? 'Светлая тема' : 'Тёмная тема';
  }
};

const savedTheme = localStorage.getItem(themeStorageKey);
setTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}

let lastScrollTop = 0;

if (siteHeader) {
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;
    const isMobileMenuOpen = mobileNav?.classList.contains('is-open');

    if (isMobileMenuOpen || currentScrollTop < 80 || currentScrollTop < lastScrollTop) {
      siteHeader.classList.remove('header--hidden');
    } else {
      siteHeader.classList.add('header--hidden');
    }

    lastScrollTop = currentScrollTop;
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const el = entry.target;
      const targetValue = Number(el.dataset.counter);
      const isFloat = !Number.isInteger(targetValue);
      const duration = 1200;
      const start = performance.now();

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = targetValue * progress;
        el.textContent = isFloat ? value.toFixed(1) : Math.round(value);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));