
// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de parallax sutil no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.1;

    // Aplicar efeito sutil apenas no conteúdo, mantendo divs orgânicas estáticas
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${parallax}px)`;
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar seções de conteúdo
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Efeito hover aprimorado para cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de brilho no botão CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function () {
        // Adicionar efeito de pulse
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
}

// CSS para animação de pulse (adicionado via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', function () {
    console.log('Site com divs orgânicas carregado com sucesso!');

    // Adicionar classe para indicar que o JavaScript está ativo
    document.body.classList.add('js-loaded');
});
//navbar @media
const menu_btn = document.querySelector('.nav-brand');
const nav = document.querySelector('.navbar');

menu_btn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

//btn-cards
const carousels = document.querySelectorAll('.services-grid-img');
const nextBtns = document.querySelectorAll('.nxt-btn');
const prevBtns = document.querySelectorAll('.pre-btn');

carousels.forEach((carousel, i) => {
    const next = nextBtns[i];
    const prev = prevBtns[i];

    if (!next || !prev) return; // proteção caso falte botão

    const getContainerWidth = () => carousel.getBoundingClientRect().width;

    // botões já existentes (comportamento original)
    next.addEventListener('click', () => {
        carousel.scrollBy({ left: getContainerWidth(), behavior: 'smooth' });
    });

    prev.addEventListener('click', () => {
        carousel.scrollBy({ left: -getContainerWidth(), behavior: 'smooth' });
    });

    // autoplay: simula clique no "next" a cada X ms
    let intervalMs = 5000;
    let autoplayId = null;

    function startAutoplay() {
        stopAutoplay(); // evita duplicar intervalos
        autoplayId = setInterval(() => {
            // se já no final, volta para o início
            if (carousel.scrollLeft + getContainerWidth() >= carousel.scrollWidth - 1) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: getContainerWidth(), behavior: 'smooth' });
            }
        }, intervalMs);
    }

    function stopAutoplay() {
        if (autoplayId) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    // pausa ao passar o mouse / focar (opcional, bom pra UX)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // reinicia autoplay após carregamento / redimensionamento (recalcula largura)
    window.addEventListener('resize', () => {
        // opcional: snap ou recalculo adicional
    });

    startAutoplay();
});