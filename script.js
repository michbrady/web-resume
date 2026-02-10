document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // Scroll Progress Bar
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    // ============================================
    // Sticky Navigation — show after scrolling past hero
    // ============================================
    const stickyNav = document.getElementById('stickyNav');
    const header = document.querySelector('.header');

    function updateStickyNav() {
        if (!header) return;
        const headerBottom = header.getBoundingClientRect().bottom;
        stickyNav.classList.toggle('visible', headerBottom < 0);
    }

    // ============================================
    // Active nav link highlighting
    // ============================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section[id]');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 120;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }

    // Combined scroll handler
    window.addEventListener('scroll', function () {
        updateScrollProgress();
        updateStickyNav();
        updateActiveNav();
    }, { passive: true });

    // ============================================
    // Smooth scrolling for nav links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // Intersection Observer — fade-up with stagger
    // ============================================
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-up + stagger classes
    document.querySelectorAll('.section').forEach(function (el) {
        el.classList.add('fade-up');
        fadeObserver.observe(el);
    });

    // Stagger cards within grids
    document.querySelectorAll('.achievements-grid, .education-grid, .tech-categories').forEach(function (grid) {
        Array.from(grid.children).forEach(function (child, i) {
            child.classList.add('fade-up', 'stagger-' + Math.min(i + 1, 6));
            fadeObserver.observe(child);
        });
    });

    // Stagger timeline items
    document.querySelectorAll('.experience-item').forEach(function (item, i) {
        item.classList.add('fade-up', 'stagger-' + Math.min(i + 1, 6));
        fadeObserver.observe(item);
    });

    // ============================================
    // Section title reveal animation
    // ============================================
    var titleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title').forEach(function (title) {
        titleObserver.observe(title);
    });

    // ============================================
    // Animated stat counters
    // ============================================
    var statsAnimated = false;
    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        statsObserver.observe(statsRow);
    }

    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            var duration = 1500;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var elapsed = timestamp - startTime;
                var progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * eased);
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(step);
        });
    }

    // ============================================
    // 3D tilt effect on achievement cards
    // ============================================
    document.querySelectorAll('.achievement-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -4;
            var rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    // ============================================
    // Typing effect for the main title
    // ============================================
    var titleElement = document.querySelector('.profile-info h1');
    if (titleElement) {
        var originalText = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid rgba(255,255,255,0.7)';

        var i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(function () {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        }

        setTimeout(typeWriter, 400);
    }

    // ============================================
    // Interactive timeline hover
    // ============================================
    document.querySelectorAll('.experience-item').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(8px)';
        });
        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ============================================
    // Click-to-copy contact info
    // ============================================
    document.querySelectorAll('.contact-item').forEach(function (item) {
        var link = item.querySelector('a');
        if (link && (link.href.includes('mailto:') || link.href.includes('tel:'))) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function (e) {
                e.preventDefault();
                var textToCopy = link.textContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then(function () {
                        showCopyNotification(item, 'Copied!');
                    });
                } else {
                    var textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyNotification(item, 'Copied!');
                }
            });
        }
    });

    function showCopyNotification(element, message) {
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText =
            'position:absolute;top:-30px;left:50%;transform:translateX(-50%);' +
            'background:var(--color-blue);color:white;padding:4px 10px;' +
            'border-radius:6px;font-size:12px;z-index:1000;opacity:0;' +
            'transition:opacity 0.3s ease;pointer-events:none;';

        element.style.position = 'relative';
        element.appendChild(notification);

        setTimeout(function () { notification.style.opacity = '1'; }, 10);
        setTimeout(function () {
            notification.style.opacity = '0';
            setTimeout(function () {
                if (notification.parentNode) notification.parentNode.removeChild(notification);
            }, 300);
        }, 1500);
    }

    // ============================================
    // Dark mode toggle (CSS custom properties)
    // ============================================
    var darkModeToggle = document.getElementById('darkModeToggle');

    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        var isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDark);
    });

    // ============================================
    // Tech tag hover
    // ============================================
    document.querySelectorAll('.tech-tag').forEach(function (tag) {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});
