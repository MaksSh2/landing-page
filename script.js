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
    themeBtn.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
  }
};

const savedTheme = localStorage.getItem(themeStorageKey);
setTheme(savedTheme === 'dark' ? 'dark' : 'light');

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

window.addEventListener("scroll", () => {

  if(window.scrollY > 60){

    siteHeader.classList.add("scrolled")

  }else{

    siteHeader.classList.remove("scrolled")

  }

})

const buttons = document.querySelectorAll(".btn")

buttons.forEach(btn => {

  btn.addEventListener("mousemove", e => {

    const rect = btn.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width/2
    const y = e.clientY - rect.top - rect.height/2

    btn.style.transform =
      `translate(${x*0.08}px, ${y*0.08}px) scale(1.05)`

  })

  btn.addEventListener("mouseleave", () => {

    btn.style.transform = ""

  })

})

const progressBar = document.querySelector(".scroll-progress")

window.addEventListener("scroll",()=>{

const scroll = window.scrollY
const height = document.body.scrollHeight - window.innerHeight

const progress = (scroll / height) * 100

progressBar.style.width = progress + "%"

})

const spotlightCards = document.querySelectorAll(".feature, .hero-card")

spotlightCards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

card.style.setProperty("--x", x + "px")
card.style.setProperty("--y", y + "px")

})

})