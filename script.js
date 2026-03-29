/* ============================================
   KARTHIK KUMAR RAJU - PORTFOLIO
   GSAP + ScrollTrigger animations
   ============================================ */

(function () {
    'use strict';

    // Safety: always show page if JS fails after 3s
    var safetyTimer = setTimeout(forceShow, 3000);

    function forceShow() {
        var pl = document.getElementById('preloader');
        if (pl) { pl.style.opacity = '0'; pl.style.visibility = 'hidden'; pl.style.pointerEvents = 'none'; }
        document.body.classList.remove('loading');
    }

    function hidePreloader(cb) {
        var pl = document.getElementById('preloader');
        if (pl) {
            pl.classList.add('done');
            setTimeout(function () {
                pl.style.display = 'none';
                if (cb) cb();
            }, 450);
        } else {
            if (cb) cb();
        }
        document.body.classList.remove('loading');
    }

    document.addEventListener('DOMContentLoaded', function () {

        // Check GSAP
        if (typeof gsap === 'undefined') {
            clearTimeout(safetyTimer);
            forceShow();
            return;
        }

        try {
            gsap.registerPlugin(ScrollTrigger);
            if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
        } catch (e) {
            clearTimeout(safetyTimer);
            forceShow();
            return;
        }

        document.body.classList.add('loading');
        runPreloader();

        function runPreloader() {
            var fill = document.getElementById('preloaderFill');
            var pct = document.getElementById('preloaderPercent');

            var tl = gsap.timeline({
                onComplete: function () {
                    clearTimeout(safetyTimer);
                    hidePreloader(startPage);
                }
            });

            tl.to(fill, {
                width: '100%',
                duration: 1,
                ease: 'power2.inOut',
                onUpdate: function () {
                    if (pct) pct.textContent = Math.round(this.progress() * 100) + '%';
                }
            })
            .to('.preloader-inner', { opacity: 0, y: -20, duration: 0.3, ease: 'power3.in' }, '+=0.1');
        }

        // ========== START PAGE ==========
        function startPage() {
            heroEntrance();
            initScrollAnimations();
            initNavbar();
            initTyping();
            initTabs();
            initContactForm();
            initHoverEffects();
            initScrollProgress();
            initParallax();
        }

        // ========== HERO ENTRANCE ==========
        function heroEntrance() {
            var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('#navbar', { y: -80, opacity: 0, duration: 0.7 })
              .from('.hero-badge', { y: 30, opacity: 0, duration: 0.5 }, '-=0.2')
              .from('.hero-title', { y: 50, opacity: 0, duration: 0.7 }, '-=0.2')
              .from('.hero-roles', { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
              .from('.hero-desc', { y: 30, opacity: 0, duration: 0.5 }, '-=0.2')
              .from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
              .from('.hero-socials a', { y: 20, opacity: 0, duration: 0.3, stagger: 0.06 }, '-=0.2')
              .from('.hero-card', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
              .from('.fbadge', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, '-=0.4')
              .from('.scroll-indicator', { opacity: 0, duration: 0.4 }, '-=0.2');
        }

        // ========== SCROLL ANIMATIONS ==========
        function initScrollAnimations() {

            // Helper: animate element on scroll
            function scrollReveal(selector, fromVars, triggerOpts) {
                var els = gsap.utils.toArray(selector);
                els.forEach(function (el, i) {
                    var vars = Object.assign({}, fromVars);
                    if (vars._staggerDelay) {
                        vars.delay = i * vars._staggerDelay;
                        delete vars._staggerDelay;
                    }
                    vars.scrollTrigger = Object.assign({ trigger: el, start: 'top 88%' }, triggerOpts || {});
                    gsap.from(el, vars);
                });
            }

            // Section headers
            scrollReveal('.section-header', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });

            // About
            scrollReveal('.about-text', { x: -50, opacity: 0, duration: 0.8, ease: 'power3.out' });
            scrollReveal('.metric-card', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', _staggerDelay: 0.1 });

            // Stat counters
            gsap.utils.toArray('.stat-number').forEach(function (el) {
                var target = parseInt(el.dataset.count) || 0;
                var obj = { val: 0 };
                ScrollTrigger.create({
                    trigger: el, start: 'top 88%', once: true,
                    onEnter: function () {
                        gsap.to(obj, {
                            val: target, duration: 2, ease: 'power2.out',
                            onUpdate: function () { el.textContent = Math.floor(obj.val); }
                        });
                    }
                });
            });

            // Metric bars
            gsap.utils.toArray('.metric-fill').forEach(function (fill, i) {
                var widths = [40, 65, 55, 50];
                gsap.to(fill, {
                    width: (widths[i] || 50) + '%', duration: 1.4, ease: 'power2.out',
                    scrollTrigger: { trigger: fill, start: 'top 92%' }
                });
            });

            // Skill tabs + tiles
            scrollReveal('.tab-buttons', { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
            scrollReveal('#tab-blockchain .skill-tile', { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out', _staggerDelay: 0.07 }, { trigger: '#tab-blockchain' });

            // Skill bars
            gsap.utils.toArray('.level-fill').forEach(function (fill) {
                gsap.to(fill, {
                    width: fill.dataset.width + '%', duration: 1.4, ease: 'power2.out',
                    scrollTrigger: { trigger: fill, start: 'top 92%' }
                });
            });

            // Experience
            scrollReveal('.exp-item', { y: 50, opacity: 0, duration: 0.7, ease: 'power3.out', _staggerDelay: 0.15 });

            // Projects
            scrollReveal('.project-card', { y: 50, opacity: 0, duration: 0.6, ease: 'power3.out', _staggerDelay: 0.1 });

            // Certs
            scrollReveal('.cert-card', { y: 40, opacity: 0, duration: 0.5, ease: 'power3.out', _staggerDelay: 0.08 });

            // Community
            scrollReveal('.community-card', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', _staggerDelay: 0.12 });

            // Contact
            scrollReveal('.contact-link-card', { x: -30, opacity: 0, duration: 0.5, ease: 'power3.out', _staggerDelay: 0.07 });
            scrollReveal('.contact-form', { x: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });

            // Footer
            scrollReveal('.footer-top', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, { start: 'top 95%' });
        }

        // ========== SCROLL PROGRESS ==========
        function initScrollProgress() {
            var bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);
            gsap.to(bar, {
                width: '100%', ease: 'none',
                scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
            });
        }

        // ========== PARALLAX ==========
        function initParallax() {
            gsap.utils.toArray('.mesh-orb').forEach(function (orb, i) {
                gsap.to(orb, {
                    y: (i + 1) * 120, ease: 'none',
                    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true }
                });
            });
            gsap.utils.toArray('.fbadge').forEach(function (badge, i) {
                gsap.to(badge, {
                    y: (i + 1) * -30, ease: 'none',
                    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
                });
            });
        }

        // ========== NAVBAR ==========
        function initNavbar() {
            var navbar = document.getElementById('navbar');
            var navToggle = document.getElementById('navToggle');
            var navLinks = document.getElementById('navLinks');

            window.addEventListener('scroll', function () {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });

            navToggle.addEventListener('click', function () {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('open');
                document.body.classList.toggle('nav-open');
            });

            document.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.classList.remove('nav-open');
                });
            });

            // Active on scroll
            var sections = document.querySelectorAll('section[id]');
            window.addEventListener('scroll', function () {
                var scrollY = window.scrollY + 150;
                sections.forEach(function (section) {
                    var top = section.offsetTop, h = section.offsetHeight, id = section.getAttribute('id');
                    var link = document.querySelector('.nav-link[href="#' + id + '"]');
                    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
                });
            });

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(function (a) {
                a.addEventListener('click', function (e) {
                    var t = document.querySelector(this.getAttribute('href'));
                    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
                });
            });

            // Back to top
            var btt = document.getElementById('backToTop');
            if (btt) {
                window.addEventListener('scroll', function () { btt.classList.toggle('visible', window.scrollY > 500); });
                btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
            }
        }

        // ========== TYPING ==========
        function initTyping() {
            var roles = ['Web3 & Blockchain Developer', 'Full-Stack Engineer', 'Smart Contract Developer', 'DApp Builder', 'React & Node.js Developer', 'Open Source Contributor'];
            var ri = 0, ci = 0, del = false;
            var el = document.getElementById('typedRole');
            if (!el) return;
            (function type() {
                var r = roles[ri];
                del ? ci-- : ci++;
                el.textContent = r.substring(0, ci);
                var sp = del ? 30 : 70;
                if (!del && ci === r.length) { sp = 2200; del = true; }
                else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; sp = 500; }
                setTimeout(type, sp);
            })();
        }

        // ========== TABS ==========
        function initTabs() {
            document.querySelectorAll('.tab-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = btn.dataset.tab;
                    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    document.querySelectorAll('.tab-content').forEach(function (c) {
                        if (c.id === 'tab-' + id) {
                            c.classList.add('active');
                            gsap.fromTo(c.querySelectorAll('.skill-tile, .tool-chip'),
                                { y: 25, opacity: 0 },
                                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
                            );
                            c.querySelectorAll('.level-fill').forEach(function (f) {
                                gsap.fromTo(f, { width: '0%' }, { width: f.dataset.width + '%', duration: 1.2, ease: 'power2.out', delay: 0.2 });
                            });
                        } else { c.classList.remove('active'); }
                    });
                });
            });
        }

        // ========== CONTACT FORM ==========
        function initContactForm() {
            var TOKEN = '8344964601:AAGx38qclq84sjp4xmYpRATAOcrkuprQrak';
            var CHAT = '754775643';
            var form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.checkValidity()) { form.reportValidity(); return; }
                var fd = new FormData(form);
                var n = (fd.get('name') || '').trim(), em = (fd.get('email') || '').trim();
                var s = (fd.get('subject') || '').trim(), m = (fd.get('message') || '').trim();
                if (!n || !em || !s || !m) { alert('Please fill in all fields.'); return; }

                var btn = form.querySelector('.btn-primary'), orig = btn.innerHTML;
                btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
                btn.disabled = true;

                fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: CHAT, parse_mode: 'Markdown',
                        text: '📩 *New Portfolio Message*\n\n👤 *Name:* ' + n + '\n📧 *Email:* ' + em + '\n📋 *Subject:* ' + s + '\n\n💬 *Message:*\n' + m })
                }).then(function (r) { return r.json(); }).then(function (d) {
                    if (d.ok) {
                        btn.innerHTML = '<span><i class="fas fa-check"></i> Sent!</span>';
                        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
                        form.reset();
                    } else { throw new Error(); }
                }).catch(function () {
                    window.location.href = 'mailto:karthikumaraju@gmail.com?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent('From: ' + n + '\nEmail: ' + em + '\n\n' + m);
                    btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
                }).finally(function () {
                    setTimeout(function () { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
                });
            });
        }

        // ========== HOVER EFFECTS ==========
        function initHoverEffects() {
            // Spotlight glow
            document.querySelectorAll('.project-card, .metric-card, .skill-tile, .cert-card, .community-card, .exp-card, .contact-link-card').forEach(function (c) {
                c.addEventListener('mousemove', function (e) {
                    var r = c.getBoundingClientRect();
                    c.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
                    c.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
                });
            });

            // Lift on hover
            function addHoverLift(sel, y) {
                document.querySelectorAll(sel).forEach(function (el) {
                    el.addEventListener('mouseenter', function () { gsap.to(el, { y: y || -5, duration: 0.3, ease: 'power2.out' }); });
                    el.addEventListener('mouseleave', function () { gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' }); });
                });
            }
            addHoverLift('.project-card, .skill-tile, .cert-card, .metric-card, .tool-chip', -5);

            // Slide on hover
            function addHoverSlide(sel, x) {
                document.querySelectorAll(sel).forEach(function (el) {
                    el.addEventListener('mouseenter', function () { gsap.to(el, { x: x, duration: 0.3, ease: 'power2.out' }); });
                    el.addEventListener('mouseleave', function () { gsap.to(el, { x: 0, duration: 0.4, ease: 'power2.out' }); });
                });
            }
            addHoverSlide('.exp-card', 5);
            addHoverSlide('.contact-link-card:not(.no-hover)', 6);

            // Hero card
            var hc = document.querySelector('.hero-card');
            if (hc) {
                hc.addEventListener('mouseenter', function () { gsap.to(hc, { y: -8, duration: 0.3, ease: 'power2.out' }); });
                hc.addEventListener('mouseleave', function () { gsap.to(hc, { y: 0, duration: 0.4, ease: 'power2.out' }); });
            }

            // Magnetic buttons
            document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (b) {
                b.addEventListener('mousemove', function (e) {
                    var r = b.getBoundingClientRect();
                    gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.15, duration: 0.3, ease: 'power2.out' });
                });
                b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }); });
            });

            // Ripple
            document.querySelectorAll('.btn').forEach(function (b) {
                b.addEventListener('click', function (e) {
                    var rip = document.createElement('span');
                    rip.className = 'btn-ripple';
                    var r = b.getBoundingClientRect();
                    rip.style.left = (e.clientX - r.left) + 'px';
                    rip.style.top = (e.clientY - r.top) + 'px';
                    b.appendChild(rip);
                    gsap.fromTo(rip, { scale: 0, opacity: 0.3 }, { scale: 1, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: function () { rip.remove(); } });
                });
            });
        }
    });
})();
