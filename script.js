const drawer = document.getElementById('infoDrawer');
const drawerToggle = document.getElementById('drawerToggle');
const drawerClose = document.getElementById('drawerClose');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const tabs = document.querySelectorAll('.drawer-tab');
const panels = document.querySelectorAll('.drawer-panel');
const techCards = document.getElementById('techCards');
const leadForm = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');

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
    if (event.key === 'Escape') closeDrawer();
});

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach((item) => {
            item.classList.remove('active');
            item.setAttribute('aria-selected', 'false');
        });
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
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

const renderTechCards = async () => {
    try {
        const response = await fetch('/api/animations');
        const data = await response.json();
        techCards.innerHTML = data.map((item) => `
            <article class="card reveal">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small>Технология: ${item.tech}</small>
            </article>
        `).join('');
    } catch (error) {
        techCards.innerHTML = '<article class="card">Не удалось загрузить анимации с сервера.</article>';
    }
};

leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(leadForm));

    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('request failed');

        formStatus.textContent = 'Заявка отправлена. Мы свяжемся с вами.';
        leadForm.reset();
    } catch (error) {
        formStatus.textContent = 'Ошибка отправки. Попробуйте позже.';
    }
});

renderTechCards();
