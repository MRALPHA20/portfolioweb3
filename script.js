/* ============================================
   KARTHIK KUMAR RAJU - PORTFOLIO
   GSAP animations with bulletproof fallbacks
   ============================================ */

(function () {
    'use strict';

    // Safety: always hide preloader after max 5s
    var safetyTimer = setTimeout(function () {
        hidePreloader();
    }, 3500);

    function hidePreloader() {
        var pl = document.getElementById('preloader');
        if (pl) {
            pl.classList.add('done');
            setTimeout(function () { pl.style.display = 'none'; }, 600);
        }
        document.body.classList.remove('loading');
    }

    document.addEventListener('DOMContentLoaded', function () {

        // Check if GSAP loaded
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, showing page without animations');
            clearTimeout(safetyTimer);
            hidePreloader();
            return;
        }

        try {
            gsap.registerPlugin(ScrollTrigger);
            if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
        } catch (e) {
            console.warn('GSAP plugin error:', e);
            clearTimeout(safetyTimer);
            hidePreloader();
            return;
        }

        document.body.classList.add('loading');

        // ========== PRELOADER ==========
        try {
            var preloaderFill = document.getElementById('preloaderFill');
            var preloaderPercent = document.getElementById('preloaderPercent');

            var plTL = gsap.timeline({
                onComplete: function () {
                    clearTimeout(safetyTimer);
                    hidePreloader();
                    startPage();
                }
            });

            plTL.set('.preloader-logo, .preloader-text, .preloader-bar, .preloader-percent', { opacity: 1 })
                .from('.preloader-logo', { opacity: 0, y: 15, duration: 0.3, ease: 'power2.out' })
                .from('.preloader-text', { opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1')
                .from('.preloader-bar', { opacity: 0, duration: 0.2 }, '-=0.1')
                .from('.preloader-percent', { opacity: 0, duration: 0.2 }, '-=0.1')
                .to(preloaderFill, {
                    width: '100%',
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onUpdate: function () {
                        if (preloaderPercent) {
                            preloaderPercent.textContent = Math.round(this.progress() * 100) + '%';
                        }
                    }
                })
                .to('.preloader-inner', { opacity: 0, y: -15, duration: 0.3, ease: 'power3.in' }, '+=0.1');

        } catch (e) {
            console.warn('Preloader error:', e);
            clearTimeout(safetyTimer);
            hidePreloader();
            startPage();
        }

        // ========== MAIN PAGE INIT ==========
        function startPage() {
            try { heroEntrance(); } catch (e) { console.warn('Hero error:', e); }
            try { initScrollAnimations(); } catch (e) { console.warn('Scroll anim error:', e); }
            try { initNavbar(); } catch (e) { console.warn('Navbar error:', e); }
            try { initTyping(); } catch (e) { console.warn('Typing error:', e); }
            try { initTabs(); } catch (e) { console.warn('Tabs error:', e); }
            try { initContactForm(); } catch (e) { console.warn('Contact error:', e); }
            try { initSpotlight(); } catch (e) { console.warn('Spotlight error:', e); }
            try { initScrollProgress(); } catch (e) { console.warn('Progress error:', e); }
            try { initParallax(); } catch (e) { console.warn('Parallax error:', e); }
        }

        // ========== HERO ENTRANCE ==========
        function heroEntrance() {
            var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('#navbar', { y: -80, opacity: 0, duration: 0.8 })
              .from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
              .from('.hero-title', { y: 50, opacity: 0, duration: 0.8 }, '-=0.3')
              .from('.hero-roles', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
              .from('.hero-desc', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
              .from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
              .from('.hero-socials a', { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.3')
              .from('.hero-card', { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.7')
              .from('.fbadge', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, '-=0.5')
              .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');
        }

        // ========== SCROLL ANIMATIONS ==========
        function initScrollAnimations() {

            // Section headers
            gsap.utils.toArray('.section-header').forEach(function (el) {
                gsap.from(el, {
                    y: 50, opacity: 0,
                    duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' }
                });
            });

            // About text
            var aboutText = document.querySelector('.about-text');
            if (aboutText) {
                gsap.from(aboutText, {
                    x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: aboutText, start: 'top 85%' }
                });
            }

            // Metric cards
            gsap.utils.toArray('.metric-card').forEach(function (card, i) {
                gsap.from(card, {
                    y: 40, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%' }
                });
            });

            // Stat counters
            gsap.utils.toArray('.stat-number').forEach(function (el) {
                var target = parseInt(el.dataset.count);
                var obj = { val: 0 };
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 88%',
                    onEnter: function () {
                        gsap.to(obj, {
                            val: target, duration: 2, ease: 'power2.out',
                            onUpdate: function () { el.textContent = Math.floor(obj.val); }
                        });
                    },
                    once: true
                });
            });

            // Metric bars
            gsap.utils.toArray('.metric-fill').forEach(function (fill, i) {
                var widths = [40, 65, 55, 50];
                gsap.to(fill, {
                    width: (widths[i] || 50) + '%',
                    duration: 1.5, ease: 'power2.out',
                    scrollTrigger: { trigger: fill, start: 'top 92%' }
                });
            });

            // Tab buttons
            var tabBtns = document.querySelector('.tab-buttons');
            if (tabBtns) {
                gsap.from(tabBtns, {
                    y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
                    scrollTrigger: { trigger: tabBtns, start: 'top 90%' }
                });
            }

            // Active skill tiles (blockchain tab)
            var blockchainTab = document.querySelector('#tab-blockchain');
            if (blockchainTab) {
                gsap.from(blockchainTab.querySelectorAll('.skill-tile'), {
                    y: 40, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: blockchainTab, start: 'top 88%' }
                });
            }

            // Skill bars
            gsap.utils.toArray('.level-fill').forEach(function (fill) {
                gsap.to(fill, {
                    width: fill.dataset.width + '%',
                    duration: 1.4, ease: 'power2.out',
                    scrollTrigger: { trigger: fill, start: 'top 92%' }
                });
            });

            // Experience items
            gsap.utils.toArray('.exp-item').forEach(function (item, i) {
                gsap.from(item, {
                    y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
                    delay: i * 0.15,
                    scrollTrigger: { trigger: item, start: 'top 88%' }
                });
            });

            // Project cards
            gsap.utils.toArray('.project-card').forEach(function (card, i) {
                gsap.from(card, {
                    y: 50, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%' }
                });
            });

            // Cert cards
            gsap.utils.toArray('.cert-card').forEach(function (card, i) {
                gsap.from(card, {
                    y: 40, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%' }
                });
            });

            // Community cards
            gsap.utils.toArray('.community-card').forEach(function (card, i) {
                gsap.from(card, {
                    y: 40, opacity: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 88%' }
                });
            });

            // Contact links
            gsap.utils.toArray('.contact-link-card').forEach(function (card, i) {
                gsap.from(card, {
                    x: -40, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 92%' }
                });
            });

            // Contact form
            var contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                gsap.from(contactForm, {
                    x: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: contactForm, start: 'top 85%' }
                });
            }

            // Footer
            var footerTop = document.querySelector('.footer-top');
            if (footerTop) {
                gsap.from(footerTop, {
                    y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
                    scrollTrigger: { trigger: footerTop, start: 'top 95%' }
                });
            }
        }

        // ========== SCROLL PROGRESS ==========
        function initScrollProgress() {
            var bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);

            gsap.to(bar, {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3
                }
            });
        }

        // ========== PARALLAX ==========
        function initParallax() {
            gsap.utils.toArray('.mesh-orb').forEach(function (orb, i) {
                gsap.to(orb, {
                    y: (i + 1) * 120,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true
                    }
                });
            });

            gsap.utils.toArray('.fbadge').forEach(function (badge, i) {
                gsap.to(badge, {
                    y: (i + 1) * -30,
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
            var navbar = document.getElementById('navbar');
            var navToggle = document.getElementById('navToggle');
            var navLinks = document.getElementById('navLinks');
            var allNavLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', function () {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });

            navToggle.addEventListener('click', function () {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('open');
                document.body.classList.toggle('nav-open');
            });

            allNavLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.classList.remove('nav-open');
                });
            });

            // Active nav on scroll
            var sections = document.querySelectorAll('section[id]');
            window.addEventListener('scroll', function () {
                var scrollY = window.scrollY + 150;
                sections.forEach(function (section) {
                    var top = section.offsetTop;
                    var height = section.offsetHeight;
                    var id = section.getAttribute('id');
                    var link = document.querySelector('.nav-link[href="#' + id + '"]');
                    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
                });
            });

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
                anchor.addEventListener('click', function (e) {
                    var href = this.getAttribute('href');
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        if (typeof ScrollToPlugin !== 'undefined') {
                            gsap.to(window, { scrollTo: { y: target, offsetY: 72 }, duration: 1, ease: 'power3.inOut' });
                        } else {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });

            // Back to top
            var backToTop = document.getElementById('backToTop');
            if (backToTop) {
                window.addEventListener('scroll', function () {
                    backToTop.classList.toggle('visible', window.scrollY > 500);
                });
                backToTop.addEventListener('click', function () {
                    if (typeof ScrollToPlugin !== 'undefined') {
                        gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            }
        }

        // ========== TYPING ==========
        function initTyping() {
            var roles = [
                'Web3 & Blockchain Developer',
                'Full-Stack Engineer',
                'Smart Contract Developer',
                'DApp Builder',
                'React & Node.js Developer',
                'Open Source Contributor'
            ];
            var roleIndex = 0, charIndex = 0, isDeleting = false;
            var typedEl = document.getElementById('typedRole');
            if (!typedEl) return;

            function typeRole() {
                var currentRole = roles[roleIndex];
                if (isDeleting) charIndex--;
                else charIndex++;
                typedEl.textContent = currentRole.substring(0, charIndex);

                var speed = isDeleting ? 30 : 70;
                if (!isDeleting && charIndex === currentRole.length) { speed = 2200; isDeleting = true; }
                else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
                setTimeout(typeRole, speed);
            }
            typeRole();
        }

        // ========== SKILL TABS ==========
        function initTabs() {
            var tabButtons = document.querySelectorAll('.tab-btn');
            var tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var tabId = btn.dataset.tab;
                    tabButtons.forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');

                    tabContents.forEach(function (content) {
                        if (content.id === 'tab-' + tabId) {
                            content.classList.add('active');
                            var items = content.querySelectorAll('.skill-tile, .tool-chip');
                            if (items.length) {
                                gsap.fromTo(items,
                                    { y: 30, opacity: 0 },
                                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
                                );
                            }
                            content.querySelectorAll('.level-fill').forEach(function (fill) {
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
            var TELEGRAM_BOT_TOKEN = '8344964601:AAGx38qclq84sjp4xmYpRATAOcrkuprQrak';
            var TELEGRAM_CHAT_ID = '754775643';
            var form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.checkValidity()) { form.reportValidity(); return; }

                var fd = new FormData(form);
                var name = (fd.get('name') || '').trim();
                var email = (fd.get('email') || '').trim();
                var subject = (fd.get('subject') || '').trim();
                var message = (fd.get('message') || '').trim();

                if (!name || !email || !subject || !message) {
                    alert('Please fill in all fields before sending.');
                    return;
                }

                var btn = form.querySelector('.btn-primary');
                var originalHTML = btn.innerHTML;
                btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
                btn.disabled = true;

                var text = '📩 *New Portfolio Message*\n\n👤 *Name:* ' + name + '\n📧 *Email:* ' + email + '\n📋 *Subject:* ' + subject + '\n\n💬 *Message:*\n' + message;

                fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'Markdown' })
                })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    if (data.ok) {
                        btn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
                        form.reset();
                    } else {
                        throw new Error('Telegram failed');
                    }
                })
                .catch(function () {
                    window.location.href = 'mailto:karthikumaraju@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message);
                    btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
                })
                .finally(function () {
                    setTimeout(function () {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
            });
        }

        // ========== SPOTLIGHT + HOVER ==========
        function initSpotlight() {
            var cards = document.querySelectorAll('.project-card, .metric-card, .skill-tile, .cert-card, .community-card, .exp-card, .contact-link-card');
            cards.forEach(function (card) {
                card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
                });
            });

            // Hover lift
            document.querySelectorAll('.project-card, .skill-tile, .cert-card, .metric-card, .tool-chip').forEach(function (el) {
                el.addEventListener('mouseenter', function () { gsap.to(el, { y: -6, duration: 0.3, ease: 'power2.out' }); });
                el.addEventListener('mouseleave', function () { gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' }); });
            });

            document.querySelectorAll('.exp-card').forEach(function (el) {
                el.addEventListener('mouseenter', function () { gsap.to(el, { x: 6, duration: 0.3, ease: 'power2.out' }); });
                el.addEventListener('mouseleave', function () { gsap.to(el, { x: 0, duration: 0.4, ease: 'power2.out' }); });
            });

            document.querySelectorAll('.contact-link-card:not(.no-hover)').forEach(function (el) {
                el.addEventListener('mouseenter', function () { gsap.to(el, { x: 8, duration: 0.3, ease: 'power2.out' }); });
                el.addEventListener('mouseleave', function () { gsap.to(el, { x: 0, duration: 0.4, ease: 'power2.out' }); });
            });

            var heroCard = document.querySelector('.hero-card');
            if (heroCard) {
                heroCard.addEventListener('mouseenter', function () { gsap.to(heroCard, { y: -10, duration: 0.4, ease: 'power2.out' }); });
                heroCard.addEventListener('mouseleave', function () { gsap.to(heroCard, { y: 0, duration: 0.5, ease: 'power2.out' }); });
            }

            // Magnetic buttons
            document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (btn) {
                btn.addEventListener('mousemove', function (e) {
                    var rect = btn.getBoundingClientRect();
                    var x = e.clientX - rect.left - rect.width / 2;
                    var y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
                });
                btn.addEventListener('mouseleave', function () {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
                });
            });

            // Ripple
            document.querySelectorAll('.btn').forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    var ripple = document.createElement('span');
                    ripple.className = 'btn-ripple';
                    var rect = btn.getBoundingClientRect();
                    ripple.style.left = (e.clientX - rect.left) + 'px';
                    ripple.style.top = (e.clientY - rect.top) + 'px';
                    btn.appendChild(ripple);
                    gsap.fromTo(ripple,
                        { scale: 0, opacity: 0.4 },
                        { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: function () { ripple.remove(); } }
                    );
                });
            });
        }
    });
})();
