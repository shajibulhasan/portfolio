    (function() {
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            });

            const items = [
                { text: 'Full Stack Developer', color: '#667eea' },
                { text: 'Laravel Developer', color: '#f093fb' },
                { text: 'React Developer', color: '#4facfe' }
            ];
            const el = document.getElementById('rotating-title');
            if (el) {
                let i = 0, charIdx = 0, typing = true;
                const speed = 100, pause = 1500;
                
                function step() {
                    if (typing) {
                        if (charIdx < items[i].text.length) {
                            charIdx++;
                            el.textContent = items[i].text.slice(0, charIdx);
                            setTimeout(step, speed);
                        } else {
                            typing = false;
                            setTimeout(step, pause);
                        }
                    } else {
                        if (charIdx > 0) {
                            charIdx--;
                            el.textContent = items[i].text.slice(0, charIdx);
                            setTimeout(step, 50);
                        } else {
                            typing = true;
                            i = (i + 1) % items.length;
                            setTimeout(step, 200);
                        }
                    }
                }
                el.textContent = '';
                step();
            }

            // Contact form
            document.getElementById('contactForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('✨ Thank you for your message! I will get back to you soon with a gradient smile 😊');
                this.reset();
            });

            const faders = document.querySelectorAll('.fade-up');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('appeared');
                });
            }, { threshold: 0.1 });
            faders.forEach(f => observer.observe(f));

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.navbar .nav-link');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120;
                    if (window.scrollY >= sectionTop) current = section.id;
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
                });
            });
    })();
