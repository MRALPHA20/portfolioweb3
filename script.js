/* ============================================
   KARTHIK KUMAR RAJU - PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- TYPING ANIMATION ----------
    const roles = [
        'Web3 & Blockchain Developer',
        'Full-Stack Engineer',
        'Smart Contract Developer',
        'DApp Builder',
        'React & Node.js Developer',
        'Open Source Contributor'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
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

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeRole, speed);
    }

    typeRole();

    // ---------- NAVBAR ----------
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
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ---------- SCROLL REVEAL ----------
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- STAT COUNTER ----------
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 25);
    }

    // ---------- SKILL BARS ----------
    const skillFills = document.querySelectorAll('.level-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));

    // ---------- SKILL TABS ----------
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
                    // Re-trigger skill bar animation for this tab
                    content.querySelectorAll('.level-fill').forEach(fill => {
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = fill.dataset.width + '%';
                        }, 100);
                    });
                }
            });
        });
    });

    // ---------- BACK TO TOP ----------
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- CONTACT FORM (Telegram Bot) ----------
    const TELEGRAM_BOT_TOKEN = '8344964601:AAGx38qclq84sjp4xmYpRATAOcrkuprQrak';
    const TELEGRAM_CHAT_ID = '754775643';

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const btn = contactForm.querySelector('.btn-primary');
        const originalHTML = btn.innerHTML;

        // Show loading state
        btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
        btn.disabled = true;

        const text = `📩 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📋 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`;

        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            const data = await res.json();

            if (data.ok) {
                btn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
                contactForm.reset();
            } else {
                // Fallback to mailto if Telegram fails
                const mailtoLink = `mailto:karthikumaraju@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                window.location.href = mailtoLink;
                btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
                btn.style.background = 'linear-gradient(135deg, #06B6D4, #0891B2)';
            }
        } catch (err) {
            // Fallback to mailto on network error
            const mailtoLink = `mailto:karthikumaraju@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            window.location.href = mailtoLink;
            btn.innerHTML = '<span><i class="fas fa-envelope"></i> Opening Email...</span>';
            btn.style.background = 'linear-gradient(135deg, #06B6D4, #0891B2)';
        }

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });

    // ---------- SMOOTH SCROLL for all anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- PARALLAX BLOBS ----------
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const blobs = document.querySelectorAll('.blob');
                blobs.forEach((blob, i) => {
                    const speed = (i + 1) * 0.03;
                    blob.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---------- TILT EFFECT on project cards ----------
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---------- MAGNETIC BUTTONS ----------
    const magneticBtns = document.querySelectorAll('.btn-primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ---------- GLOW EFFECT on cert cards ----------
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(108, 99, 255, 0.08) 0%, var(--bg-card) 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ---------- INTERSECTION OBSERVER for stagger ----------
    const staggerContainers = ['.skills-grid', '.certs-grid', '.tools-cloud'];
    staggerContainers.forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;
        const children = container.querySelectorAll('.reveal-up');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.06}s`;
        });
    });
});
