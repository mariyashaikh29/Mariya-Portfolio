/**
 * MARIYA SHAIKH — RED TEAM CYBERSECURITY PORTFOLIO
 * Core Script:
 * 1. Red Embers Canvas Engine (Drifting particles, turbulence, glowing crimson/ember hues)
 * 2. Typewriter Role Cycling
 * 3. Interactive Red Team Terminal Emulator (root@redteam:~$ with rich CLI)
 * 4. 3D Interactive Tilt on Project Cards
 * 5. Project Category Filtering
 * 6. HUD Certificate Modal Viewer (with verified asset preview)
 * 7. Floating Pill Navbar & Scrollspy
 * 8. Clipboard Copy Channels
 * 9. Encrypted Transmission Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    initRedEmbersCanvas();
    initTypewriter();
    initTerminal();
    initProjectTilt();
    initProjectFilters();
    initCertificateModal();
    initNavbar();
    initScrollSpy();
    initCopyButtons();
    initContactForm();
});

/* ==========================================================================
   1. RED EMBERS CANVAS PARTICLES ENGINE
   ========================================================================== */
function initRedEmbersCanvas() {
    const canvas = document.getElementById('redteamCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Palette: Crimson (#E11D2E), Ember Orange (#FF6A1A), Hot Amber (#FFB020)
    const emberPalette = [
        '225, 29, 46',   // Crimson
        '255, 106, 26',  // Ember
        '255, 176, 32',  // Hot Amber
        '180, 15, 25'    // Deep Red
    ];

    const particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 14), 75);

    class EmberParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : height + 10 + Math.random() * 20;
            this.radius = Math.random() * 2.2 + 0.8;
            this.color = emberPalette[Math.floor(Math.random() * emberPalette.length)];
            this.baseAlpha = Math.random() * 0.5 + 0.25;
            this.alpha = this.baseAlpha;
            this.speedY = Math.random() * 0.7 + 0.35; // upward drift
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.flickerSpeed = Math.random() * 0.04 + 0.01;
            this.flickerAngle = Math.random() * Math.PI * 2;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.flickerAngle) * 0.3;
            this.flickerAngle += this.flickerSpeed;
            this.alpha = this.baseAlpha + Math.sin(this.flickerAngle) * 0.15;

            // Mouse repulsion / swirl
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 3;
                    this.y += (dy / dist) * force * 3;
                }
            }

            // Recycle if particle leaves top or sides
            if (this.y < -15 || this.x < -20 || this.x > width + 20) {
                this.reset(false);
            }
        }

        draw() {
            const safeAlpha = Math.max(0.1, Math.min(0.85, this.alpha));
            // Faint outer glow halo
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${safeAlpha * 0.25})`;
            ctx.fill();

            // Core bright ember
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${safeAlpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new EmberParticle());
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Draw and update embers
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby embers with faint glowing filament
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 90) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const lineAlpha = (1 - dist / 90) * 0.12;
                    ctx.strokeStyle = `rgba(225, 29, 46, ${lineAlpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(render);
    }

    render();
}

/* ==========================================================================
   2. TYPEWRITER HERO ROLE ANIMATION
   ========================================================================== */
function initTypewriter() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'Cybersecurity Analyst',
        'Penetration Tester',
        'OSINT Threat Hunter',
        'Ethical Hacker',
        'Adversarial Red Teamer'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2200; // Pause when complete
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before new role
        }

        setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
}

/* ==========================================================================
   3. INTERACTIVE RED TEAM TERMINAL EMULATOR
   ========================================================================== */
function initTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const quickCmdButtons = document.querySelectorAll('.rt-cmd-pill');
    if (!terminalOutput || !terminalInput) return;

    // Boot sequence
    const bootSequence = [
        { cmd: 'whoami', out: 'mariya-shaikh - Red Team & Offensive Security Specialist', delay: 300, highlight: true },
        { cmd: 'cat status.txt', out: 'active top 1% tryhackme operator', delay: 900, amber: true },
        { cmd: 'cat metrics.txt', out: 'MS Cyber (8.9 CGPI) · ISC2 Candidate · 3 Peer-Reviewed Papers (IJITEE, IJSR, IJRTE)', delay: 2200, highlight: true },
        { cmd: 'Type \'help\' for available commands.', out: 'Interactive CLI ready. Type commands or click the chips below.', delay: 2800 }
    ];

    bootSequence.forEach((item) => {
        setTimeout(() => {
            appendTerminalOutput(item.cmd, item.out, item.highlight, item.amber);
        }, item.delay);
    });

    // Interactive input execution
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = terminalInput.value.trim();
            if (rawCmd) {
                processCommand(rawCmd);
            }
            terminalInput.value = '';
        }
    });

    // Clickable quick pills
    quickCmdButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                processCommand(cmd);
                terminalInput.focus();
            }
        });
    });

    function processCommand(cmd) {
        const cleanCmd = cmd.toLowerCase().trim();

        if (cleanCmd === 'clear' || cleanCmd === 'cls') {
            terminalOutput.innerHTML = '';
            return;
        }

        let response = '';
        let isHighlight = false;
        let isAmber = false;

        switch (cleanCmd) {
            case 'help':
                response = `Available commands:
  whoami           - Display operator identity & clearance
  cat status.txt   - Check operational posture & engagement status
  ls skills        - List offensive tools, recon & exploit arsenal
  ls projects      - Featured projects with severity tags & links
  cat experience.log - Audit history & internship practicums
  cat credentials.gpg - Verified badges (ISC2, Cisco, Microsoft, Forensics)
  cat publications.bib - Peer-reviewed papers in IJITEE, IJSR, IJRTE
  ./contact.sh     - Direct encrypted coordinates & transmission
  clear            - Wipe terminal buffer`;
                break;

            case 'whoami':
                response = `[OPERATOR PROFILE]
Name: Mariya Shaikh
Clearance: ISC2 Candidate Standing
Ranking: Top 1% Global TryHackMe CTF Player
Education: MS Cybersecurity, University of Mumbai (8.9 CGPI)
Research: 3 Peer-Reviewed Machine Learning Smishing Papers
Mission: Offensive security assessments, VAPT, threat tooling`;
                isHighlight = true;
                break;

            case 'status':
            case 'cat status.txt':
                response = `[OPERATIONAL STATUS]
Engagements: Authorized engagements only
Target Readiness: 100% OPERATIONAL
Current Vector: Training for Offensive Security Certified Professional (OSCP)
Focus Areas: Network PrivEsc, Web Exploits (OWASP), NLP Threat Detection`;
                isAmber = true;
                break;

            case 'skills':
            case 'ls skills':
                response = `[ARSENAL MATRIX]
• Recon & Intel: Shodan, VirusTotal, Censys, 60+ Google Dorks, crt.sh, Epieos
• Exploitation: Kali Linux, Nmap, Burp Suite, Metasploit, Hydra, Linux PrivEsc
• Web Security: OWASP Top 10, SQLi, XSS, SSRF, IDOR, Gobuster, Nikto
• SOC & Defense: Splunk, Wazuh SIEM, Wireshark`;
                break;

            case 'projects':
            case 'ls projects':
                response = `[ACTIVE OPERATIONS]
[CRITICAL] VulnSense -> Sandbox simulator (Live: vulnsense.vercel.app)
[HIGH]     DORKSCOPE v2.0 PRO -> 60+ Dorks & OSINT Suite (mariyashaikh29.github.io/DorkScope)
[CRITICAL] Smishing Threat Detector -> 99% accuracy ensemble AI (smishing-detector-mariya.streamlit.app)
[HIGH]     Network Recon Suite -> Multi-threaded TCP SYN scanner & auditor
[MEDIUM]   Phishing Forensics -> SPF/DKIM header trace & reputation analyzer`;
                isHighlight = true;
                break;

            case 'experience':
            case 'cat experience.log':
                response = `[ENGAGEMENT LOG]
2025-09: OSINT Intern @ Cyber Secured India (.MKITOS / #OSINTforGood)
2025-05: Cyber Security Intern @ Elevate Labs (Nmap, Wireshark, Phishing Forensics)
2023-11: SOC Analyst Intern @ Chaitanya Cyber Strix (Splunk, Wazuh SIEM, MITRE ATT&CK)
2023-12: Digital Forensics Intern @ Cyber Secured India (88.89% practical score)`;
                break;

            case 'creds':
            case 'certs':
            case 'cat credentials.gpg':
                response = `[VERIFIED CREDENTIALS]
• ISC2 Candidate Official Standing & Badge
• TryHackMe Pre Security Learning Path (THM-QV6PSQAROX) & Love at First Breach CTF
• Cisco Networking Academy: Junior Cybersecurity Analyst Career Path
• Microsoft Student SOC Program Foundations Training
• Cyber Secured India: Digital Forensics Certification (88.89% Score)
• Security Blue Team: Introduction to Digital Forensics (ID: 733308357)
• Centri: Introduction to Penetration Testing (ID: 122977468)
• CodeRed EC-Council: SQL Injection Attacks (ID: 515190)`;
                isAmber = true;
                break;

            case 'papers':
            case 'research':
            case 'cat publications.bib':
                response = `[PEER-REVIEWED PUBLICATIONS]
[1] IJITEE (Apr 2025): "Smishing Detection: Combating SMS Phishing Attacks By Utilizing Machine-Learning Algorithms"
[2] IJSR (Dec 2025): "Comparative Analysis of Machine Learning Models for Smishing Message Detection" (Paper ID: SR251223103916)
[3] IJRTE (Mar 2026): "A Comparative Analysis of Deep Learning Models for Smishing Detection in SMS Message" (DOI: 10.35940/ijrte.A8345.14060326)`;
                isHighlight = true;
                break;

            case 'contact':
            case './contact.sh':
                response = `[COMMUNICATION CHANNELS]
Email:    shaikhmariya2909@gmail.com
Phone:    +91 9920573564
LinkedIn: linkedin.com/in/mariya-shaikh29
GitHub:   github.com/mariyashaikh29
Location: Mumbai, Maharashtra, India`;
                isHighlight = true;
                break;

            default:
                response = `bash: ${cleanCmd}: command not recognized. Type 'help' to review available red team directives.`;
                break;
        }

        appendTerminalOutput(cmd, response, isHighlight, isAmber);
    }

    function appendTerminalOutput(cmd, output, isHighlight = false, isAmber = false) {
        const entry = document.createElement('div');
        entry.className = 'rt-log-entry';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'rt-log-cmd';
        cmdLine.innerHTML = `<span class="rt-user-host">root@redteam</span><span class="text-muted">:</span><span class="rt-cmd-arg">~$</span> <span>${escapeHtml(cmd)}</span>`;
        entry.appendChild(cmdLine);

        if (output) {
            const outLine = document.createElement('div');
            let outClasses = 'rt-log-out';
            if (isHighlight) outClasses += ' highlight';
            if (isAmber) outClasses += ' amber';
            outLine.className = outClasses;
            outLine.textContent = output;
            entry.appendChild(outLine);
        }

        terminalOutput.appendChild(entry);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

/* ==========================================================================
   4. 3D TILT EFFECT ON PROJECT CARDS
   ========================================================================== */
function initProjectTilt() {
    const cards = document.querySelectorAll('.rt-project-card');
    if (!cards.length) return;

    // Check if device supports hover
    if (window.matchMedia('(hover: hover)').matches) {
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.rt-filter-pill');
    const projectCards = document.querySelectorAll('.rt-project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   6. HUD CERTIFICATE MODAL VIEWER
   ========================================================================== */
function initCertificateModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalIssuer = document.getElementById('modalCertIssuer');
    const modalDate = document.getElementById('modalCertDate');
    const modalId = document.getElementById('modalCertId');
    const modalDesc = document.getElementById('modalCertDesc');
    const closeBtn = document.getElementById('modalCloseBtn');
    const certCards = document.querySelectorAll('.rt-cert-card');

    if (!modal) return;

    certCards.forEach((card) => {
        const viewBtn = card.querySelector('.rt-view-cert-btn');
        const trigger = viewBtn || card;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title') || 'Certificate of Completion';
            const issuer = card.getAttribute('data-issuer') || 'Authorized Entity';
            const date = card.getAttribute('data-date') || 'Verified';
            const certId = card.getAttribute('data-id') || 'Verified Credential';
            const desc = card.getAttribute('data-desc') || '';

            if (modalImg && imgSrc) modalImg.src = imgSrc;
            if (modalTitle) modalTitle.textContent = title;
            if (modalIssuer) modalIssuer.textContent = issuer;
            if (modalDate) modalDate.textContent = date;
            if (modalId) modalId.textContent = certId;
            if (modalDesc) modalDesc.textContent = desc;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   7. FLOATING PILL NAVBAR & SCROLLSPY
   ========================================================================== */
function initNavbar() {
    const navbarPill = document.getElementById('navbarPill');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.rt-nav-link');

    window.addEventListener('scroll', () => {
        if (navbarPill) {
            if (window.scrollY > 40) {
                navbarPill.classList.add('scrolled');
            } else {
                navbarPill.classList.remove('scrolled');
            }
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.rt-nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   8. COPY TO CLIPBOARD BUTTONS
   ========================================================================== */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.rt-copy-btn');

    copyButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check text-crimson"></i>';
                btn.setAttribute('title', 'Copied to clipboard!');

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        });
    });
}

/* ==========================================================================
   9. ENCRYPTED TRANSMISSION CONTACT FORM
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');
        const submitBtn = form.querySelector('button[type="submit"]');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            feedback.className = 'rt-form-feedback error';
            feedback.textContent = '[!] TRANSMISSION REJECTED: Specify operator name, email address, and payload body.';
            return;
        }

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-satellite-dish fa-spin"></i> Encrypting Payload...';
        submitBtn.disabled = true;

        setTimeout(() => {
            feedback.className = 'rt-form-feedback success';
            feedback.innerHTML = `[✓] TRANSMISSION ENCRYPTED &amp; RECEIVED. Initializing client gateway to deliver to <strong>shaikhmariya2909@gmail.com</strong>...`;

            const mailtoUri = `mailto:shaikhmariya2909@gmail.com?subject=${encodeURIComponent(
                subject || 'Red Team Engagement / Security Inquiry from ' + name
            )}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

            window.location.href = mailtoUri;

            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
            form.reset();
        }, 850);
    });
}
