const drawer = document.getElementById('infoDrawer');
const drawerToggle = document.getElementById('drawerToggle');
const drawerClose = document.getElementById('drawerClose');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const tabs = document.querySelectorAll('.drawer-tab');
const panels = document.querySelectorAll('.drawer-panel');

const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    drawerToggle.setAttribute('aria-expanded', 'true');
    drawerBackdrop.hidden = false;
};

const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    drawerToggle.setAttribute('aria-expanded', 'false');
    drawerBackdrop.hidden = true;
};

drawerToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeDrawer();
    }
});

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach((item) => {
            item.classList.remove('active');
            item.setAttribute('aria-selected', 'false');
        });

        panels.forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.panel === target);
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
    });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => observer.observe(element));