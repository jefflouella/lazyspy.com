// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initSmoothScrolling();
    initImageLoading();
    initScrollAnimations();
    initButtonEffects();
    initScreenshotHover();
    initAnalyticsTracking();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Image loading animations
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.5';
                this.style.filter = 'grayscale(100%)';
            });
        }
    });
}

// Scroll animations
function initScrollAnimations() {
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .screenshot-item, .highlight-item, .audience-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Screenshot hover effects
function initScreenshotHover() {
    const screenshots = document.querySelectorAll('.screenshot-item');
    
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            this.querySelector('.screenshot-overlay').style.transform = 'translateY(0)';
        });
        
        screenshot.addEventListener('mouseleave', function() {
            this.querySelector('.screenshot-overlay').style.transform = 'translateY(100%)';
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const heroImage = document.querySelector('.hero-screenshot');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        });
    }
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                animateCounter(target, 0, numericValue, isPercentage);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, isPercentage) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = isPercentage ? `${current}%` : current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Form handling for demo requests (if needed)
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = 'Sent!';
                submitButton.style.background = '#10b981';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Date.now() - startTime;
        console.log(`Time on page: ${timeOnPage}ms, Max scroll: ${maxScroll}%`);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initStatsCounter();
    initMobileMenu();
    initFormHandling();
    initLazyLoading();
    initPerformanceMonitoring();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-button {
        display: none;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
        
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Analytics Tracking
function initAnalyticsTracking() {
    // Track downloads
    const downloadButtons = document.querySelectorAll('a[href*="lazyspy-extension.zip"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonLocation = this.closest('section')?.id || 'unknown';
            gtag('event', 'download', {
                'event_category': 'extension',
                'event_label': buttonLocation,
                'custom_parameter_1': buttonLocation,
                'custom_parameter_2': 'developer',
                'value': 1
            });
            
            // Track conversion
            gtag('event', 'conversion', {
                'send_to': 'G-03BF0CSG4W/extension_download',
                'value': 1,
                'currency': 'USD'
            });
        });
    });

    // Track feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('.feature-title')?.textContent || `feature_${index}`;
            gtag('event', 'feature_click', {
                'event_category': 'features',
                'event_label': featureName,
                'custom_parameter_3': featureName
            });
        });
    });

    // Track screenshot interactions
    const screenshots = document.querySelectorAll('.screenshot-item');
    screenshots.forEach((screenshot, index) => {
        screenshot.addEventListener('click', function() {
            gtag('event', 'screenshot_click', {
                'event_category': 'screenshots',
                'event_label': `screenshot_${index + 1}`,
                'custom_parameter_3': 'screenshot_view'
            });
        });
    });

    // Track installation guide clicks
    const installGuideLink = document.querySelector('.install-guide-link a');
    if (installGuideLink) {
        installGuideLink.addEventListener('click', function() {
            gtag('event', 'external_link_click', {
                'event_category': 'help',
                'event_label': 'installation_guide',
                'custom_parameter_1': 'external_guide',
                'custom_parameter_2': 'new_user'
            });
        });
    }

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track scroll milestones
            if (maxScroll >= 25 && maxScroll < 50) {
                gtag('event', 'scroll', {
                    'event_category': 'engagement',
                    'event_label': '25_percent',
                    'custom_parameter_2': 'engaged_user'
                });
            } else if (maxScroll >= 50 && maxScroll < 75) {
                gtag('event', 'scroll', {
                    'event_category': 'engagement',
                    'event_label': '50_percent',
                    'custom_parameter_2': 'highly_engaged'
                });
            } else if (maxScroll >= 75) {
                gtag('event', 'scroll', {
                    'event_category': 'engagement',
                    'event_label': '75_percent',
                    'custom_parameter_2': 'very_engaged'
                });
            }
        }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        gtag('event', 'timing_complete', {
            'name': 'page_view',
            'value': timeOnPage,
            'custom_parameter_2': timeOnPage > 30 ? 'engaged' : 'bounce'
        });
    });

    // Track button hover interactions
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const buttonText = this.textContent.trim();
            gtag('event', 'button_hover', {
                'event_category': 'interaction',
                'event_label': buttonText,
                'custom_parameter_1': 'button_interaction'
            });
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionName = this.getAttribute('href')?.replace('#', '') || 'unknown';
            gtag('event', 'navigation_click', {
                'event_category': 'navigation',
                'event_label': sectionName,
                'custom_parameter_1': 'nav_interaction'
            });
        });
    });

    // Track form interactions (if any forms are added later)
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            gtag('event', 'form_submit', {
                'event_category': 'forms',
                'event_label': e.target.id || 'contact_form',
                'custom_parameter_1': 'form_interaction'
            });
        }
    });

    // Track page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        gtag('event', 'timing_complete', {
            'name': 'page_load',
            'value': loadTime,
            'custom_parameter_1': 'performance'
        });
    });

    // Track user engagement with development notice
    const devNotice = document.querySelector('.development-notice');
    if (devNotice) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'notice_view', {
                        'event_category': 'engagement',
                        'event_label': 'development_notice',
                        'custom_parameter_2': 'new_user'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(devNotice);
    }

    // Track feature section visibility
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        'event_category': 'engagement',
                        'event_label': 'features_section',
                        'custom_parameter_3': 'feature_interest'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(featuresSection);
    }

    console.log('Analytics tracking initialized');
}
