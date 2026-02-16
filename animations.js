/* ==================== ADVANCED ANIMATION SYSTEM ==================== */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // initParticleSystem(); // Disabled - background elements hidden via CSS
    initScrollAnimations();
    initParallaxEffects();
    // initTextReveal(); // Disabled - reveal logic removed
    initMouseEffects();
    initCounterAnimations();
    // initStaggerAnimations(); // Disabled - reveal logic removed
});

/* ==================== PARTICLE SYSTEM ==================== */
function initParticleSystem() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const colors = [
        'rgba(155, 89, 182, 0.4)',
        'rgba(142, 68, 173, 0.4)',
        'rgba(187, 119, 214, 0.4)',
        'rgba(168, 107, 201, 0.4)'
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
    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => revealObserver.observe(el));

    // Progress bar animation on scroll
    const progressBar = document.querySelector('.progress-bar') || createProgressBar();
    updateProgressBar(progressBar);

    // Section transitions
    initSectionTransitions();
}

function createProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    Object.assign(bar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        background: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
        zIndex: '9999',
        transition: 'width 0.3s ease'
    });
    document.body.appendChild(bar);
    return bar;
}

function updateProgressBar(progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.dataset.sectionIndex = index;
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY + window.innerHeight / 2;
        sections.forEach(section => {
            if (section.offsetTop <= scrollTop &&
                section.offsetTop + section.offsetHeight >= scrollTop) {
                section.classList.add('in-view');
            }
        });
    });
}

/* ==================== PARALLAX EFFECTS ==================== */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax(parallaxElements);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mouse parallax
    initMouseParallax();
}

function updateParallax(elements) {
    const scrolled = window.scrollY;

    elements.forEach((el, index) => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}

function initMouseParallax() {
    const mouseParallaxElements = document.querySelectorAll('[data-mouse-parallax]');

    if (mouseParallaxElements.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        mouseParallaxElements.forEach(el => {
            const speed = el.dataset.mouseParallax || 0.05;
            const x = (window.innerWidth / 2 - mouseX) * speed;
            const y = (window.innerHeight / 2 - mouseY) * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/* ==================== TEXT REVEAL ANIMATIONS ==================== */
function initTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');

    textRevealElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';

        // Split text into words
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 0.05}s`;
            el.appendChild(span);
        });
    });

    // Intersection Observer for text reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    textRevealElements.forEach(el => observer.observe(el));
}

/* ==================== MOUSE EFFECTS ==================== */
function initMouseEffects() {
    // Custom cursor (optional, for desktop)
    if (window.innerWidth > 768) {
        initCustomCursor();
    }

    // Magnetic buttons
    initMagneticButtons();

    // Glow effect on hover
    initGlowEffects();
}

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'rgba(255, 215, 0, 0.5)',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9998',
        transition: 'transform 0.1s ease',
        mixBlendMode: 'difference'
    });

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    Object.assign(cursorDot.style, {
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: '#fff',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999'
    });

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX - 2 + 'px';
        cursorDot.style.top = mouseY - 2 + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = el.dataset.strength || 0.3;

            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

function initGlowEffects() {
    const glowElements = document.querySelectorAll('.glow');

    glowElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 215, 0, 0.3), transparent 50%)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.background = '';
        });
    });
}

/* ==================== COUNTER ANIMATIONS ==================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                const duration = parseInt(counter.dataset.duration) || 2000;
                animateCounter(counter, target, duration);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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

/* ==================== STAGGER ANIMATIONS ==================== */
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');

    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        const delay = parseInt(container.dataset.delay) || 100;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * delay);
                    });
                    observer.unobserve(container);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    });
}

/* ==================== SCROLL SPEED INDICATOR ==================== */
function initScrollSpeedIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-speed-indicator';
    Object.assign(indicator.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '20px',
        fontSize: '12px',
        zIndex: '9998',
        transition: 'opacity 0.3s'
    });
    document.body.appendChild(indicator);

    let lastScrollY = window.scrollY;
    let lastTimestamp = Date.now();
    let currentSpeed = 0;

    window.addEventListener('scroll', () => {
        const now = Date.now();
        const deltaY = Math.abs(window.scrollY - lastScrollY);
        const deltaTime = (now - lastTimestamp) / 1000;
        currentSpeed = Math.round(deltaY / deltaTime);

        lastScrollY = window.scrollY;
        lastTimestamp = now;

        indicator.textContent = `Speed: ${currentSpeed}px/s`;
        indicator.style.opacity = currentSpeed > 50 ? '1' : '0';

        // Fade out after 2 seconds of no scroll
        clearTimeout(window.scrollSpeedTimeout);
        window.scrollSpeedTimeout = setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    });
}

/* ==================== SMOOTH SCROLL WITH OFFSET ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== PERFORMANCE OPTIMIZATION ==================== */
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Optimize animations on low-end devices
const isLowEndDevice = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection && connection.effectiveType === 'slow-2g';
};

if (isLowEndDevice()) {
    // Disable heavy animations
    document.querySelectorAll('.particles-container, .mesh-gradient').forEach(el => {
        el.style.display = 'none';
    });
}

/* ==================== ANIMATION UTILITIES ==================== */

// Add reveal class to elements
function addRevealClasses() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const elements = section.querySelectorAll('h2, p, .card, .item');
        elements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Parallax utility
function addParallax(element, speed) {
    element.classList.add('parallax');
    element.dataset.speed = speed;
}

// Mouse parallax utility
function addMouseParallax(element, speed) {
    element.dataset.mouseParallax = speed;
}

// Counter utility
function addCounter(element, target, duration) {
    element.dataset.counter = target;
    element.dataset.duration = duration;
    element.textContent = '0';
}

// Export utilities for external use
window.AnimationUtils = {
    addRevealClasses,
    addParallax,
    addMouseParallax,
    addCounter
};

// Initialize utilities
setTimeout(() => {
    addRevealClasses();
}, 100);
