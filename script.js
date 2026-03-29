/* ============================================
   KARTHIK KUMAR RAJU - PORTFOLIO SCRIPTS
   Premium Apple/Google-level animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== SMOOTH SCROLL (Lenis-style) ==========
    // Override default scroll for buttery smooth feel
    let scrollTarget = window.scrollY;
    let scrollCurrent = window.scrollY;
    let scrollEase = 0.08;
    let rafId = null;
    let isSmooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========== SCROLL PROGRESS BAR ==========
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateScrollProgress() {
        const winH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / winH) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ========== CUSTOM CURSOR ==========
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    });

    function animateCursor() {
        dotX += (cursorX - dotX) * 0.15;
        dotY += (cursorY - dotY) * 0.15;
        cursor.style.left = dotX + 'px';
        cursor.style.top = dotY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    document.querySelectorAll('a, button, .btn, .skill-tile, .project-card, .cert-card, .tab-btn, .contact-link-card, .metric-card, .tool-chip').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // ========== HERO TEXT SPLIT ANIMATION ==========
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.innerHTML.split(/(\s+)/);
        heroTitle.innerHTML = words.map((word, i) => {
            if (word.trim() === '') return word;
            return `<span class="word-wrap"><span class="word" style="animation-delay: ${0.3 + i * 0.06}s">${word}</span></span>`;
        }).join('');
    }

    // ========== TYPING ANIMATION ==========
    const roles = [
        'Web3 & Blockchain Developer',
        'Full-Stack Engineer',
        'Smart Contract Developer',
        'DApp Builder',
        'React & Node.js Developer',
        'Open Source Contributor'
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedEl = document.getElementById('typedRole');

    function typeRole() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typedEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 70;
        if (!isDeleting && charIndex === currentRole.length) { speed = 2200; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
        setTimeout(typeRole, speed);
    }
    typeRole();

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.classList.toggle('nav-open');
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.classList.remove('nav-open');
        });
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < top + height);
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ========== SCROLL REVEAL (Apple-style with blur + scale) ==========
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== STAT COUNTER (with easing) ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.count));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(easeOutExpo(progress) * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    }

    // ========== SKILL BARS ==========
    const skillFills = document.querySelectorAll('.level-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => skillObserver.observe(fill));

    // ========== SKILL TABS ==========
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabId}`) {
                    content.classList.add('active');
                    // Re-trigger animations
                    content.querySelectorAll('.level-fill').forEach(fill => {
                        fill.style.width = '0%';
                        setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 100);
                    });
                    content.querySelectorAll('.reveal-up').forEach((el, i) => {
                        el.classList.remove('revealed');
                        setTimeout(() => el.classList.add('revealed'), i * 60);
                    });
                }
            });
        });
    });

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== CONTACT FORM (Telegram Bot) ==========
    const TELEGRAM_BOT_TOKEN = '8344964601:AAGx38qclq84sjp4xmYpRATAOcrkuprQrak';
    const TELEGRAM_CHAT_ID = '754775643';

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        const btn = contactForm.querySelector('.btn-primary');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
        btn.disabled = true;

        const text = `📩 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📋 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`;

        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
            });
            const data = await res.json();

            if (data.ok) {
                btn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
                contactForm.reset();
            } else {
                window.location.href = `mailto:karthikumaraju@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
            }
        } catch {
            window.location.href = `mailto:karthikumaraju@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
        }

        setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; }, 3000);
    });

    // ========== SMOOTH SCROLL for anchors ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ========== PARALLAX DEPTH LAYERS ==========
    let pTicking = false;
    window.addEventListener('scroll', () => {
        if (!pTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                document.querySelectorAll('.mesh-orb').forEach((orb, i) => {
                    const speed = (i + 1) * 0.04;
                    orb.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
                });
                // Parallax floating badges
                document.querySelectorAll('.fbadge').forEach((badge, i) => {
                    const speed = (i + 1) * -0.02;
                    badge.style.transform = `translateY(${scrolled * speed}px)`;
                });
                pTicking = false;
            });
            pTicking = true;
        }
    });

    // ========== APPLE SPOTLIGHT EFFECT on cards ==========
    document.querySelectorAll('.project-card, .metric-card, .skill-tile, .cert-card, .community-card, .exp-card, .contact-link-card, .game-form').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ========== 3D TILT on project cards ==========
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 8;
            const rotateY = (x - 0.5) * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            setTimeout(() => { card.style.transition = ''; }, 600);
        });
    });

    // ========== MAGNETIC EFFECT on buttons ==========
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ========== BUTTON RIPPLE EFFECT ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });
    });

    // ========== STAGGER ANIMATION DELAYS ==========
    ['.skills-grid', '.certs-track', '.tools-cloud', '.projects-grid', '.achievement-grid', '.community-grid'].forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;
        container.querySelectorAll('.reveal-up').forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.07}s`;
        });
    });

    // ========== HERO ENTRANCE SEQUENCE ==========
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150);
        });
        const heroVisual = document.querySelector('.hero .reveal-right');
        if (heroVisual) setTimeout(() => heroVisual.classList.add('revealed'), 600);
    }, 200);

    // ========== TEXT GRADIENT SHIMMER on hero ==========
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(el => {
        el.classList.add('shimmer');
    });

    // ========== SECTION HEADER PARALLAX ==========
    const sectionHeaders = document.querySelectorAll('.section-header');
    window.addEventListener('scroll', () => {
        sectionHeaders.forEach(header => {
            const rect = header.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (visible) {
                const offset = (window.innerHeight - rect.top) * 0.03;
                header.style.transform = `translateY(${-offset}px)`;
            }
        });
    });

    // ========== INTERSECTION OBSERVER for metric bars ==========
    const metricBars = document.querySelectorAll('.metric-fill');
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                metricObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    metricBars.forEach(bar => metricObserver.observe(bar));
});
