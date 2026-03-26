// Přesměrování do admin sekce
if (new URLSearchParams(window.location.search).has('admin')) {
    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    // Navigace – scroll efekt
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Mobilní menu
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // Plynulý scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Načíst a zobrazit novinky (localStorage má přednost)
    let novinky = [];
    const saved = localStorage.getItem('mikroagra_data');
    if (saved) {
        try { novinky = JSON.parse(saved).novinky || []; } catch {}
    } else {
        try {
            const resp = await fetch('data.json?t=' + Date.now());
            const data = await resp.json();
            novinky = data.novinky || [];
        } catch (e) {
            console.error('Chyba při načítání novinek:', e);
        }
    }
    renderNovinky(novinky);
});

function renderNovinky(novinky) {
    const container = document.getElementById('novinkyList');
    if (novinky.length === 0) {
        container.innerHTML = '<p class="novinky-empty">Zatím žádné novinky.</p>';
        return;
    }
    container.innerHTML = novinky.map(n => `
        <article class="novinka-card">
            <time class="novinka-datum">${formatDate(n.datum)}</time>
            <h3 class="novinka-titulek">${esc(n.titulek)}</h3>
            <p class="novinka-text">${esc(n.text)}</p>
        </article>
    `).join('');
}

function formatDate(str) {
    try {
        return new Date(str + 'T00:00:00').toLocaleDateString('cs-CZ', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    } catch { return str; }
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}
