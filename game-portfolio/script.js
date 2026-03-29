/* ============================================
   KARTHIK KUMAR RAJU - GAME PORTFOLIO JS
   RPG mechanics, XP system, interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== GAME STATE ==========
    const state = {
        score: 0,
        xp: 0,
        maxXp: 1000,
        coins: 0,
        soundOn: false,
        started: false,
        visited: new Set()
    };

    // ========== DOM REFS ==========
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const hud = document.getElementById('hud');
    const gameNav = document.getElementById('gameNav');
    const gameWorld = document.getElementById('gameWorld');
    const gameFooter = document.getElementById('gameFooter');
    const xpFill = document.getElementById('xpFill');
    const xpText = document.getElementById('xpText');
    const scoreValue = document.getElementById('scoreValue');
    const coinCount = document.getElementById('coinCount');
    const hudLevel = document.getElementById('hudLevel');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const coinParticles = document.getElementById('coinParticles');

    // ========== AUDIO CONTEXT (Web Audio API for 8-bit sounds) ==========
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(type) {
        if (!state.soundOn || !audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        switch (type) {
            case 'start':
                osc.type = 'square';
                osc.frequency.setValueAtTime(523, audioCtx.currentTime);
                osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
                osc.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.4);
                break;
            case 'coin':
                osc.type = 'square';
                osc.frequency.setValueAtTime(988, audioCtx.currentTime);
                osc.frequency.setValueAtTime(1319, audioCtx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.2);
                break;
            case 'xp':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, audioCtx.currentTime);
                osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.2);
                break;
            case 'click':
                osc.type = 'square';
                osc.frequency.setValueAtTime(660, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.08);
                break;
        }
    }

    // ========== START GAME ==========
    startBtn.addEventListener('click', () => {
        initAudio();
        state.started = true;
        state.soundOn = true;
        playSound('start');

        startScreen.style.transition = 'opacity 0.8s ease';
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            hud.classList.remove('hidden');
            gameNav.classList.remove('hidden');
            gameWorld.classList.remove('hidden');
            gameFooter.classList.remove('hidden');

            // Trigger initial reveals
            triggerReveals();
        }, 800);
    });

    // ========== SOUND TOGGLE ==========
    soundToggle.addEventListener('click', () => {
        initAudio();
        state.soundOn = !state.soundOn;
        soundIcon.className = state.soundOn ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        playSound('click');
    });

    // ========== XP & SCORE SYSTEM ==========
    function addXP(amount, sourceEl) {
        state.xp = Math.min(state.xp + amount, state.maxXp);
        state.score += amount * 10;
        state.coins += Math.floor(amount / 10);

        updateHUD();
        playSound('xp');

        // Show XP popup
        if (sourceEl) {
            const rect = sourceEl.getBoundingClientRect();
            showXPPopup(rect.left + rect.width / 2, rect.top, `+${amount} XP`);
        }
    }

    function showXPPopup(x, y, text) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = text;
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1200);
    }

    function spawnCoin(x, y) {
        const coin = document.createElement('div');
        coin.className = 'coin-particle';
        coin.textContent = '\u2605';
        coin.style.left = x + 'px';
        coin.style.top = y + 'px';
        coinParticles.appendChild(coin);
        playSound('coin');
        setTimeout(() => coin.remove(), 1000);
    }

    function updateHUD() {
        const xpPercent = (state.xp / state.maxXp) * 100;
        xpFill.style.width = xpPercent + '%';
        xpText.textContent = `${state.xp} / ${state.maxXp}`;
        scoreValue.textContent = String(state.score).padStart(6, '0');
        coinCount.textContent = state.coins;
    }

    // ========== LEVEL NAV ==========
    const levelBtns = document.querySelectorAll('.level-btn');

    levelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            playSound('click');

            levelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            hudLevel.textContent = btn.dataset.world;

            const target = document.querySelector(btn.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active level on scroll
    const worlds = document.querySelectorAll('.world');
    window.addEventListener('scroll', () => {
        if (!state.started) return;
        const scrollY = window.scrollY + 200;

        worlds.forEach(world => {
            const top = world.offsetTop;
            const height = world.offsetHeight;
            const worldNum = world.dataset.world;

            if (scrollY >= top && scrollY < top + height) {
                levelBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.level === worldNum);
                    if (btn.dataset.level === worldNum) {
                        hudLevel.textContent = btn.dataset.world;
                    }
                });

                // Award XP for visiting new worlds
                if (!state.visited.has(worldNum)) {
                    state.visited.add(worldNum);
                    addXP(50, world.querySelector('.world-title-card'));
                    spawnCoin(window.innerWidth / 2, 100);
                }
            }
        });
    });

    // ========== SKILL TABS ==========
    const stTabs = document.querySelectorAll('.st-tab');
    const stContents = document.querySelectorAll('.st-content');

    stTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            playSound('click');
            const tabId = tab.dataset.tab;

            stTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            stContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                    // Re-trigger skill fills
                    content.querySelectorAll('.xp-fill-mini').forEach(fill => {
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = fill.dataset.width + '%';
                        }, 100);
                    });
                    // Re-trigger reveals
                    content.querySelectorAll('.reveal-up').forEach((el, i) => {
                        el.classList.remove('revealed');
                        setTimeout(() => el.classList.add('revealed'), i * 50);
                    });
                }
            });
        });
    });

    // ========== INTERACTIVE ELEMENTS - Click for XP ==========
    document.querySelectorAll('.skill-node, .inv-slot, .quest-card, .dungeon-card, .achievement-card').forEach(el => {
        el.addEventListener('click', (e) => {
            const xp = parseInt(el.dataset.xp) || 10;
            if (!el.dataset.collected) {
                addXP(xp, el);
                spawnCoin(e.clientX, e.clientY);
                el.dataset.collected = 'true';
                el.style.borderColor = 'var(--gold)';
            }
        });
    });

    // ========== SCROLL REVEAL ==========
    function triggerReveals() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.reveal-up').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ========== SKILL BAR ANIMATION ==========
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.xp-fill-mini').forEach(fill => {
        skillObserver.observe(fill);
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const mailtoLink = `mailto:karthikumaraju@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;

        addXP(100, contactForm);
        spawnCoin(window.innerWidth / 2, window.innerHeight / 2);

        const btn = contactForm.querySelector('.send-btn');
        btn.textContent = 'MESSAGE SENT!';
        btn.style.background = 'var(--accent-green)';
        btn.style.color = '#000';
        btn.style.borderColor = 'var(--accent-green)';

        setTimeout(() => {
            btn.textContent = '\u2709 SEND MESSAGE';
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 3000);
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== KEYBOARD NAV ==========
    document.addEventListener('keydown', (e) => {
        if (!state.started) {
            if (e.key === 'Enter' || e.key === ' ') {
                startBtn.click();
            }
            return;
        }

        const currentActive = document.querySelector('.level-btn.active');
        const currentLevel = parseInt(currentActive?.dataset.level || 1);
        let nextLevel = currentLevel;

        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            nextLevel = Math.min(currentLevel + 1, 6);
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            nextLevel = Math.max(currentLevel - 1, 1);
        }

        if (nextLevel !== currentLevel) {
            const nextBtn = document.querySelector(`.level-btn[data-level="${nextLevel}"]`);
            if (nextBtn) nextBtn.click();
        }
    });

    // ========== STAGGER ANIMATION DELAYS ==========
    document.querySelectorAll('.skill-nodes, .inventory-grid, .achievement-grid, .dungeon-grid').forEach(container => {
        container.querySelectorAll('.reveal-up').forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.05}s`;
        });
    });
});
