/**
 * MARIYA SHAIKH — CYBERSECURITY & VAPT PORTFOLIO
 * Core Script: Cyber Particles Canvas, Terminal CLI, Typewriter, Project Filters, Cert Modal & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initCyberCanvas();
    initTypewriter();
    initTerminal();
    initProjectFilters();
    initCertificateModal();
    initNavbar();
    initScrollSpy();
    initCopyButtons();
    initContactForm();
});

/* ==========================================================================
   1. CYBER PARTICLES & CONSTELLATION CANVAS
   ========================================================================== */
function initCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: null, y: null, maxDist: 150 };

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

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 80);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.75;
            this.vy = (Math.random() - 0.5) * 0.75;
            this.radius = Math.random() * 2 + 1;
            this.isCyan = Math.random() > 0.45;
            this.color = this.isCyan ? '0, 212, 255' : '0, 255, 136';
            this.alpha = Math.random() * 0.55 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 125) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - dist / 125) * 0.18;
                    ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Interactive mouse connection
            if (mouse.x !== null && mouse.y !== null) {
                const mdx = particles[i].x - mouse.x;
                const mdy = particles[i].y - mouse.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < mouse.maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const mopacity = (1 - mdist / mouse.maxDist) * 0.25;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${mopacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(render);
    }

    render();
}

/* ==========================================================================
   2. TYPEWRITER HERO ANIMATION
   ========================================================================== */
function initTypewriter() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'Offensive Security & VAPT Specialist',
        'Top 1% Global TryHackMe CTF Challenger',
        'OSINT Investigator & Threat Recon Analyst',
        'Published AI / ML Smishing Researcher',
        'ISC2 Candidate · OSCP In-Training',
        'SOC Operations & Incident Response Analyst'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before next text
        }

        setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
}

/* ==========================================================================
   3. INTERACTIVE KALI TERMINAL EMULATOR
   ========================================================================== */
function initTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const quickCmdButtons = document.querySelectorAll('.quick-cmd-btn');
    if (!terminalOutput || !terminalInput) return;

    // Automated initial boot sequence
    const bootSequence = [
        { cmd: 'whoami', out: 'Mariya Shaikh · MS Cybersecurity (8.9 CGPI) · ISC2 Candidate · Top 1% TryHackMe', delay: 400 },
        { cmd: 'uname -a', out: 'Linux kali-mariya 6.8.11-amd64 #1 SMP PREEMPT_DYNAMIC Offensive-Sec x86_64 GNU/Linux', delay: 1100, highlight: true },
        { cmd: 'cat focus_areas.txt', out: 'VAPT | Red Teaming | OSINT Threat Recon | Machine Learning Mobile Security | SOC Analysis', delay: 1800 },
        { cmd: 'python3 -m publications --count', out: '3 Peer-Reviewed Research Papers Published in IJITEE, IJSR, and IJRTE (Smishing & AI)', delay: 2600, badge: true },
        { cmd: 'echo "Ready for interactive commands. Type \'help\' for assistance."', out: 'Interactive session initiated. Type commands below.', delay: 3300 }
    ];

    bootSequence.forEach((item) => {
        setTimeout(() => {
            appendTerminalOutput(item.cmd, item.out, item.highlight, item.badge);
        }, item.delay);
    });

    // Handle interactive typing
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = terminalInput.value.trim();
            if (rawCmd) {
                processCommand(rawCmd);
            }
            terminalInput.value = '';
        }
    });

    // Quick Command Buttons Click Handler
    quickCmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                processCommand(cmd);
                terminalInput.focus();
            }
        });
    });

    function processCommand(cmd) {
        const command = cmd.toLowerCase().trim();

        if (command === 'clear' || command === 'cls') {
            terminalOutput.innerHTML = '';
            return;
        }

        let response = '';
        let isHighlight = false;
        let isBadge = false;

        switch (command) {
            case 'help':
                response = `Available commands:
• whoami       - Profile overview & credentials
• skills       - Categorized offensive & defensive skills
• projects     - Showcase of key security projects & live links
• papers       - Academic research publications in IJITEE, IJSR, IJRTE
• experience   - Summary of internship roles (CSI, Elevate Labs, Chaitanya)
• certs        - Active certifications (ISC2, Cisco, Microsoft, TryHackMe)
• education    - Degrees from University of Mumbai & SIES College
• contact      - Reach out directly via email, phone, or LinkedIn
• clear        - Clear the terminal screen`;
                break;

            case 'whoami':
                response = `Mariya Shaikh | Mumbai, Maharashtra, India
• MS in Cybersecurity, University of Mumbai (8.9 CGPI)
• ISC2 Candidate | Top 1% Global CTF Rank on TryHackMe
• Published Researcher in AI/ML Smishing Detection
• In Training for OSCP (Offensive Security Certified Professional)`;
                isHighlight = true;
                break;

            case 'skills':
                response = `Core Technical Competencies:
1. Offensive Security: Penetration Testing, VAPT, Red Teaming, OWASP Top 10, PrivEsc
2. Tools Arsenal: Kali Linux, Burp Suite, Nmap, Metasploit, Wireshark, Gobuster, Nikto, Nessus
3. Defensive & SOC: Splunk, Wazuh EDR, Incident Triage, MITRE ATT&CK, Digital Forensics
4. OSINT Recon: Shodan, VirusTotal, Censys, URLScan, WHOIS, crt.sh, Google Dorking
5. ML Security: Python, Bi-LSTM, Random Forest, TF-IDF, SMOTE, Scikit-learn, Streamlit`;
                break;

            case 'projects':
                response = `Featured Engineering Projects:
1. VulnSense (Live: https://vulnsense.vercel.app/) - Interactive sandboxed cybersecurity simulator with bilingual Hinglish & English explanations
2. DORKSCOPE v2.0 PRO (Live: https://mariyashaikh29.github.io/DorkScope/) - OSINT recon suite with 60+ Google Dorks, Shodan & VirusTotal integration
3. Smishing Detector (Live: https://smishing-detector-mariya.streamlit.app) - 99% accuracy ensemble ML/Bi-LSTM classifier for SMS phishing attacks`;
                isBadge = true;
                break;

            case 'papers':
            case 'research':
                response = `Peer-Reviewed Academic Publications:
[1] IJITEE (Apr 2025): "Smishing Detection: Combating SMS Phishing Attacks By Utilizing Machine-Learning Algorithms"
[2] IJSR (Dec 2025): "Comparative Analysis of Machine Learning Models for Smishing Message Detection" (Paper ID: SR251223103916)
[3] IJRTE (Mar 2026): "A Comparative Analysis of Deep Learning Models for Smishing Detection in SMS Message" (DOI: 10.35940/ijrte.A8345.14060326)`;
                isHighlight = true;
                break;

            case 'experience':
            case 'exp':
                response = `Work History & Internships:
• OSINT Intern @ Cyber Secured India (Sept-Oct 2025) - "CTRL. ALT. ACT." 4-week program (#OSINTforGood)
• Cyber Security Intern @ Elevate Labs (May-Jun 2025) - Network scanning, Wireshark, phishing analysis, firewall config
• SOC Analyst Intern @ Chaitanya Cyber Strix (Nov 2023 - Jan 2024) - L1 SOC operations, Wazuh, Splunk, threat analysis
• Cyber Security & Digital Forensics Intern @ Cyber Secured India (Dec 2023 - Feb 2024) - Scored 88.89% in practical assessments`;
                break;

            case 'certs':
            case 'certifications':
                response = `Credentials & Certifications:
• ISC2 Candidate (Official ISC2 Credential)
• TryHackMe Pre Security Learning Path (THM-QV6PSQAROX) & Love at First Breach CTF
• Cisco Networking Academy: Junior Cybersecurity Analyst Career Path
• Cisco Networking Academy: Cyber Threat Management & Intro to Cybersecurity
• Microsoft Student SOC Program Foundations Training
• Security Blue Team: Introduction to Digital Forensics (ID: 733308357)
• Centri: Introduction to Penetration Testing (ID: 122977468)
• CodeRed EC-Council: SQL Injection Attacks (ID: 515190)`;
                isBadge = true;
                break;

            case 'education':
            case 'edu':
                response = `Educational Qualifications:
• M.Sc. in Cybersecurity | University of Mumbai (2024-2026) | 8.9 CGPI
• B.Sc. in Computer Science | SIES College, Mumbai (2021-2024) | 9.17 CGPA`;
                break;

            case 'contact':
                response = `Direct Communication Channels:
• Email: shaikhmariya2909@gmail.com
• Phone: +91 9920573564
• LinkedIn: linkedin.com/in/mariya-shaikh29
• GitHub: github.com/mariyashaikh29
• Location: Mumbai, Maharashtra, India`;
                isHighlight = true;
                break;

            default:
                response = `zsh: command not found: ${command}. Type 'help' to view available commands.`;
                break;
        }

        appendTerminalOutput(cmd, response, isHighlight, isBadge);
    }

    function appendTerminalOutput(cmd, output, isHighlight = false, isBadge = false) {
        const line = document.createElement('div');
        line.className = 'terminal-line';

        const cmdRow = document.createElement('div');
        cmdRow.className = 'cmd-line';
        cmdRow.innerHTML = `<span class="cmd-prompt">mariya@kali-cyber:~$ </span><span class="cmd-text">${escapeHtml(cmd)}</span>`;
        line.appendChild(cmdRow);

        if (output) {
            const outRow = document.createElement('div');
            outRow.className = `output-line ${isHighlight ? 'highlight' : ''} ${isBadge ? 'badge' : ''}`;
            outRow.textContent = output;
            line.appendChild(outRow);
        }

        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

/* ==========================================================================
   4. PROJECTS FILTER TABS
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   5. CERTIFICATE IMAGE PREVIEW MODAL
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
    const certButtons = document.querySelectorAll('.view-cert-btn');

    if (!modal) return;

    certButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.cert-card');
            if (!card) return;

            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title') || 'Certificate of Completion';
            const issuer = card.getAttribute('data-issuer') || 'Authorized Issuer';
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
   6. NAVBAR & MOBILE NAVIGATION
   ========================================================================== */
function initNavbar() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   7. SCROLL SPY ACTIVE NAV LINK
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
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
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check text-primary"></i>';
                btn.setAttribute('title', 'Copied to clipboard!');

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
}

/* ==========================================================================
   9. INTERACTIVE CONTACT FORM
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
            feedback.className = 'form-feedback error';
            feedback.textContent = '[!] Please provide your name, valid email address, and message.';
            return;
        }

        // Show transmission state
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            feedback.className = 'form-feedback success';
            feedback.innerHTML = `[✓] Transmission encrypted and recorded. Launching email client to deliver to <strong>shaikhmariya2909@gmail.com</strong>...`;

            // Prepare mailto fallback
            const mailtoUri = `mailto:shaikhmariya2909@gmail.com?subject=${encodeURIComponent(subject || 'Cybersecurity Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

            window.location.href = mailtoUri;

            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
            form.reset();
        }, 800);
    });
}
