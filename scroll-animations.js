/* ==================== PROFESSIONAL SCROLL ANIMATIONS ==================== */

// Scroll Animation System
document.addEventListener('DOMContentLoaded', () => {
    initParticleSystem();
    initScrollAnimations();
    initParallaxEffects();
    initCounterAnimations();
    initHoverEffects();
});

/* ==================== PARTICLE SYSTEM ==================== */
function initParticleSystem() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const particleCount = window.innerWidth < 768 ? 20 : 40;
    const colors = [
        'rgba(155, 89, 182, 0.6)',
        'rgba(142, 68, 173, 0.6)',
        'rgba(187, 119, 214, 0.6)',
        'rgba(168, 107, 201, 0.6)'
    ];

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const left = Math.random() * 100;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(particle);

    // Recreate particle when animation ends
    setTimeout(() => {
        particle.remove();
        createParticle(container, colors);
    }, (duration + delay) * 1000);
}

/* ==================== SCROLL ANIMATIONS ==================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '100px', // Trigger 100px before element comes into view
        threshold: 0.01 // Trigger when 1% visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add stagger delay for child elements
                const children = entry.target.querySelectorAll('.animate-stagger');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 150); // Increased delay to 150ms
                });
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => scrollObserver.observe(el));

    // Check for elements already in view on initial load
    setTimeout(() => {
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('animate-in');
                const children = el.querySelectorAll('.animate-stagger');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, 100);
}

/* ==================== PARALLAX EFFECTS ==================== */
function initParallaxEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateParallax() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}

/* ==================== COUNTER ANIMATIONS ==================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.floor(start + (target - start) * easeProgress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ==================== HOVER EFFECTS ==================== */
function initHoverEffects() {
    // Tilt effect for cards
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ==================== PROGRESS BAR ==================== */
function createProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    Object.assign(bar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '4px',
        background: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
        zIndex: '9999',
        transition: 'width 0.1s ease-out'
    });
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = `${progress}%`;
    });
}

// Initialize progress bar
createProgressBar();
