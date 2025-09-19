// Enhanced interactivity for the resume
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for cards
                if (entry.target.classList.contains('achievement-card') || 
                    entry.target.classList.contains('education-item')) {
                    const cards = entry.target.parentNode.children;
                    Array.from(cards).forEach((card, index) => {
                        if (card === entry.target) {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Apply initial styles and observe elements
    const animatedElements = document.querySelectorAll('.section, .achievement-card, .education-item, .experience-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for the main title
    const titleElement = document.querySelector('.profile-info h1');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid rgba(255,255,255,0.7)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Interactive hover effects for tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            const rate = scrolled * -0.3;
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Interactive timeline
    const timelineItems = document.querySelectorAll('.experience-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.querySelector('.experience-date').style.color = '#764ba2';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.querySelector('.experience-date').style.color = '#667eea';
        });
    });

    // Add click-to-copy functionality for contact info
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && (link.href.includes('mailto:') || link.href.includes('tel:'))) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const textToCopy = link.textContent;
                
                // Modern clipboard API
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showCopyNotification(item, 'Copied!');
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
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

    // Function to show copy notification
    function showCopyNotification(element, message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        element.style.position = 'relative';
        element.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // Dark mode toggle (optional feature)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    document.body.appendChild(darkModeToggle);

    // Add dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        .dark-mode {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
        
        .dark-mode .container {
            background: #2c2c54;
            color: #e0e0e0;
        }
        
        .dark-mode .section-title {
            color: #e0e0e0;
        }
        
        .dark-mode .achievement-card,
        .dark-mode .education-item {
            background: #40407a;
            border-color: #5a5a8a;
            color: #e0e0e0;
        }
        
        .dark-mode .achievement-card h4,
        .dark-mode .education-item h4 {
            color: #e0e0e0;
        }
        
        .dark-mode .achievement-card p,
        .dark-mode .education-item p,
        .dark-mode .experience-content p {
            color: #b0b0b0;
        }
        
        .dark-mode .tech-category {
            background: linear-gradient(135deg, #40407a 0%, #5a5a8a 100%);
        }
        
        .dark-mode .summary-text {
            background: linear-gradient(135deg, #40407a 0%, #5a5a8a 100%);
            color: #e0e0e0;
        }
    `;
    
    document.head.appendChild(darkModeStyles);

    // Performance optimization: Lazy load images if any are added later
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Apply to any images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    console.log('Resume enhanced with interactive features!');
});