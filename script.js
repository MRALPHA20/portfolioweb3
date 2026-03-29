/* ============================================
   KARTHIK KUMAR RAJU - PORTFOLIO
   All animations powered by GSAP
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('loading');

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPercent = document.getElementById('preloaderPercent');

    const plTL = gsap.timeline();

    plTL.to('.preloader-logo', { opacity: 1, duration: 0.5, ease: 'power2.out' })
        .to('.preloader-text', { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to('.preloader-bar', { opacity: 1, duration: 0.3 }, '-=0.2')
        .to('.preloader-percent', { opacity: 1, duration: 0.3 }, '-=0.2')
        .to(preloaderFill, {
            width: '100%',
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: function () {
                const progress = Math.round(this.progress() * 100);
                preloaderPercent.textContent = progress + '%';
            }
        }, '-=0.1')
        .to('.preloader-inner', { opacity: 0, y: -30, duration: 0.5, ease: 'power3.in' }, '+=0.2')
        .to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.remove('loading');
                initPage();
            }
        }, '-=0.2');

    // ========== INIT PAGE (after preloader) ==========
    function initPage() {
        heroEntrance();
        initScrollAnimations();
        initNavbar();
        initTyping();
        initTabs();
        initContactForm();
        initSpotlight();
        initRipple();
        initScrollProgress();
        initParallax();
    }

    // ========== HERO ENTRANCE ==========
    function heroEntrance() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('#navbar', { y: -80, opacity: 0, duration: 0.8 })
          .from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
          .from('.hero-title', { y: 50, opacity: 0, duration: 0.8 }, '-=0.3')
          .from('.hero-roles', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
          .from('.hero-desc', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
          .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
          .from('.hero-socials a', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3')
          .from('.hero-card', { x: 80, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8')
          .from('.fbadge', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, '-=0.5')
          .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');
    }

    // ========== SCROLL ANIMATIONS ==========
    function initScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 60, opacity: 0, filter: 'blur(6px)',
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        // Reveal-up elements
        gsap.utils.toArray('.reveal-up').forEach((el, i) => {
            gsap.set(el, { visibility: 'visible' });
            gsap.from(el, {
                y: 50, opacity: 0, filter: 'blur(5px)',
                duration: 0.8, ease: 'power3.out',
                delay: (el.dataset.delay || 0) / 1000,
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });

        // Reveal-left
        gsap.utils.toArray('.reveal-left').forEach(el => {
            gsap.set(el, { visibility: 'visible' });
            gsap.from(el, {
                x: -60, opacity: 0, filter: 'blur(5px)',
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            });
        });

        // Reveal-right
        gsap.utils.toArray('.reveal-right').forEach(el => {
            gsap.set(el, { visibility: 'visible' });
            gsap.from(el, {
                x: 60, opacity: 0, filter: 'blur(5px)',
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            });
        });

        // Stagger grid items
        ['.skills-grid', '.certs-track', '.tools-cloud', '.projects-grid', '.community-grid'].forEach(selector => {
            const container = document.querySelector(selector);
            if (!container) return;
            const items = container.children;
            gsap.from(items, {
                y: 40, opacity: 0, filter: 'blur(4px)',
                duration: 0.6, stagger: 0.08, ease: 'power3.out',
                scrollTrigger: { trigger: container, start: 'top 85%' }
            });
        });

        // Experience cards slide in
        gsap.utils.toArray('.exp-item').forEach((item, i) => {
            gsap.from(item, {
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 85%' }
            });
        });

        // Skill bars
        gsap.utils.toArray('.level-fill').forEach(fill => {
            gsap.to(fill, {
                width: fill.dataset.width + '%',
                duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: fill, start: 'top 90%' }
            });
        });

        // Metric bars
        gsap.utils.toArray('.metric-fill').forEach(fill => {
            const parent = fill.closest('.metric-card');
            const index = [...parent.parentElement.children].indexOf(parent);
            const widths = [40, 65, 55, 50];
            gsap.to(fill, {
                width: (widths[index] || 50) + '%',
                duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: fill, start: 'top 90%' }
            });
        });

        // Stat counters
        gsap.utils.toArray('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.count);
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
                onUpdate: () => { el.textContent = Math.floor(obj.val); }
            });
        });

        // Contact cards stagger
        gsap.from('.contact-link-card', {
            x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-links', start: 'top 80%' }
        });

        // Contact form
        gsap.from('.contact-form', {
            x: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-form', start: 'top 80%' }
        });
    }

    // ========== SCROLL PROGRESS BAR ==========
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        gsap.to(bar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

    // ========== PARALLAX ==========
    function initParallax() {
        gsap.utils.toArray('.mesh-orb').forEach((orb, i) => {
            gsap.to(orb, {
                y: (i + 1) * 150,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            });
        });

        gsap.utils.toArray('.fbadge').forEach((badge, i) => {
            gsap.to(badge, {
                y: (i + 1) * -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    // ========== NAVBAR ==========
    function initNavbar() {
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
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + 150;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const link = document.querySelector(`.nav-link[href="#${id}"]`);
                if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    gsap.to(window, { scrollTo: { y: target, offsetY: 72 }, duration: 1, ease: 'power3.inOut' });
                }
            });
        });

        // Back to top
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' });
        });
    }

    // ========== TYPING ==========
    function initTyping() {
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
            if (isDeleting) { charIndex--; } else { charIndex++; }
            typedEl.textContent = currentRole.substring(0, charIndex);

            let speed = isDeleting ? 30 : 70;
            if (!isDeleting && charIndex === currentRole.length) { speed = 2200; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
            setTimeout(typeRole, speed);
        }
        typeRole();
    }

    // ========== SKILL TABS ==========
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                tabContents.forEach(content => {
                    if (content.id === `tab-${tabId}`) {
                        content.classList.add('active');

                        // Animate items in
                        gsap.from(content.children[0].children, {
                            y: 30, opacity: 0, duration: 0.5,
                            stagger: 0.06, ease: 'power3.out'
                        });

                        // Re-animate skill bars
                        content.querySelectorAll('.level-fill').forEach(fill => {
                            gsap.fromTo(fill,
                                { width: '0%' },
                                { width: fill.dataset.width + '%', duration: 1.2, ease: 'power2.out', delay: 0.2 }
                            );
                        });
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // ========== CONTACT FORM ==========
    function initContactForm() {
        const TELEGRAM_BOT_TOKEN = '8344964601:AAGx38qclq84sjp4xmYpRATAOcrkuprQrak';
        const TELEGRAM_CHAT_ID = '754775643';
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

            const fd = new FormData(contactForm);
            const name = fd.get('name').trim();
            const email = fd.get('email').trim();
            const subject = fd.get('subject').trim();
            const message = fd.get('message').trim();

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
    }

    // ========== SPOTLIGHT EFFECT ==========
    function initSpotlight() {
        document.querySelectorAll('.project-card, .metric-card, .skill-tile, .cert-card, .community-card, .exp-card, .contact-link-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
            });
        });

        // Hover lift with GSAP
        document.querySelectorAll('.project-card, .skill-tile, .cert-card, .metric-card, .tool-chip').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
            });
        });

        // Experience card hover
        document.querySelectorAll('.exp-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { x: 6, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { x: 0, duration: 0.4, ease: 'power2.out' });
            });
        });

        // Contact card hover
        document.querySelectorAll('.contact-link-card:not(.no-hover)').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { x: 8, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { x: 0, duration: 0.4, ease: 'power2.out' });
            });
        });

        // Hero card hover
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.addEventListener('mouseenter', () => {
                gsap.to(heroCard, { y: -10, duration: 0.4, ease: 'power2.out' });
            });
            heroCard.addEventListener('mouseleave', () => {
                gsap.to(heroCard, { y: 0, duration: 0.5, ease: 'power2.out' });
            });
        }

        // Magnetic buttons
        document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
        });
    }

    // ========== BUTTON RIPPLE ==========
    function initRipple() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                const rect = this.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';
                this.appendChild(ripple);

                gsap.fromTo(ripple,
                    { scale: 0, opacity: 0.4 },
                    { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() }
                );
            });
        });
    }
});
