
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });


        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        document.addEventListener('DOMContentLoaded', function() {
            const navbarEl = document.querySelector('.navbar');
            if (typeof bootstrap !== 'undefined' && navbarEl) {
                new bootstrap.ScrollSpy(document.body, {
                    target: '.navbar',
                    offset: navbarEl.offsetHeight + 10
                });
            }

            document.querySelectorAll('.navbar .nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    document.querySelectorAll('.navbar .nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.navbar .nav-link');

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const id = entry.target.id;
                    const navLink = document.querySelector(`.navbar .nav-link[href="#${id}"]`);
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        if (navLink) navLink.classList.add('active');
                    }
                });
            }, {
                root: null,
                threshold: 0.6
            });

            sections.forEach(section => {
                sectionObserver.observe(section);
            });
        });

        (function() {
            const items = [
                { text: 'Full Stack Developer', color: '#7CFC00' },
                { text: 'Laravel Developer', color: '#ff7a18' },
                { text: 'React Developer', color: '#61dafb' }
            ];
            const el = document.getElementById('rotating-title');
            if (!el) return;

            let itemIdx = 0;
            let charIdx = 0;
            let typing = true;

            const typingSpeed = 80;
            const deletingSpeed = 40;
            const pauseAfterType = 1100;

            function applyColor(color) {
                el.style.color = color;
                el.style.borderRightColor = color;
            }

            function step() {
                const current = items[itemIdx];
                applyColor(current.color);

                if (typing) {
                    if (charIdx < current.text.length) {
                        charIdx++;
                        el.textContent = current.text.slice(0, charIdx);
                        setTimeout(step, typingSpeed);
                    } else {
                        typing = false;
                        setTimeout(step, pauseAfterType);
                    }
                } else {
                    if (charIdx > 0) {
                        charIdx--;
                        el.textContent = current.text.slice(0, charIdx);
                        setTimeout(step, deletingSpeed);
                    } else {
                        typing = true;
                        itemIdx = (itemIdx + 1) % items.length;
                        setTimeout(step, 200);
                    }
                }
            }

            el.textContent = '';
            applyColor(items[0].color);
            step();
        })();