// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
});



// Custom Cursor
  const cursorInner = document.querySelector(".cursor-inner");
  const cursorOuter = document.querySelector(".cursor-outer");

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  // Suivi de la position de la souris
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  });

  // Animation fluide (traînée)
  function animate() {
    outerX += (mouseX - outerX) * 0.15; // vitesse d'interpolation
    outerY += (mouseY - outerY) * 0.15;
    cursorOuter.style.left = `${outerX}px`;
    cursorOuter.style.top = `${outerY}px`;
    requestAnimationFrame(animate);
  }
  animate();

  // Effet clic
  document.addEventListener("mousedown", () => {
    cursorInner.style.transform = "translate(-50%, -50%) scale(0.6)";
    cursorOuter.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursorInner.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
  });


// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Quote Calculator
class QuoteCalculator {
    constructor() {
        this.basePrices = {
            'vitrine': 3290,
            'ecommerce': 9890,
            'blog': 2190,
            'corporate': 6590,
            'landing': 1640,
            'app': 14290
        };
        
        this.pageMultipliers = {
            '1-3': 1,
            '4-7': 1.3,
            '8-15': 1.6,
            '16-30': 2,
            '30+': 2.5
        };
        
        this.designMultipliers = {
            'template': 1,
            'custom': 1.5,
            'premium': 2
        };
        
        this.featurePrices = {
            'seo': 1100,
            'cms': 2200,
            'multilangue': 1650,
            'analytics': 550,
            'maintenance': 3300,
            'hosting': 1320
        };
        
        this.init();
    }
    
    init() {
        const projectType = document.getElementById('project-type');
        const pages = document.getElementById('pages');
        const design = document.getElementById('design');
        const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
        const quoteDetails = document.getElementById('quote-details');
        
        // Add event listeners
        projectType.addEventListener('change', () => this.calculatePrice());
        pages.addEventListener('change', () => this.calculatePrice());
        design.addEventListener('change', () => this.calculatePrice());
        featureCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.calculatePrice());
        });
    }
    
    calculatePrice() {
        const projectType = document.getElementById('project-type').value;
        const pages = document.getElementById('pages').value;
        const design = document.getElementById('design').value;
        const featureCheckboxes = document.querySelectorAll('.feature-checkbox:checked');
        const quoteDetails = document.getElementById('quote-details');
        
        if (!projectType || !pages || !design) {
            document.getElementById('price-value').textContent = '0 MAD';
            quoteDetails.style.display = 'none';
            return;
        }
        
        let price = this.basePrices[projectType] || 0;
        
        // Apply page multiplier
        const pageMultiplier = this.pageMultipliers[pages] || 1;
        price *= pageMultiplier;
        
        // Apply design multiplier
        const designMultiplier = this.designMultipliers[design] || 1;
        price *= designMultiplier;
        
        // Add feature costs
        let featuresTotal = 0;
        featureCheckboxes.forEach(checkbox => {
            const feature = checkbox.value;
            featuresTotal += this.featurePrices[feature] || 0;
        });
        
        price += featuresTotal;
        
        // Update price display with animation
        const priceElement = document.getElementById('price-value');
        this.animatePrice(priceElement, Math.round(price));
        
        // Show quote details
        quoteDetails.style.display = 'block';
        
        // Track calculator usage
        this.trackCalculatorUsage(projectType, pages, design, featuresTotal);
    }
    
    animatePrice(element, targetPrice) {
        const startPrice = parseInt(element.textContent) || 0;
        const duration = 500;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentPrice = Math.round(startPrice + (targetPrice - startPrice) * progress);
            element.textContent = `${currentPrice.toLocaleString('fr-FR')} MAD`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    trackCalculatorUsage(projectType, pages, design, featuresTotal) {
        // Track calculator usage for analytics
        const eventData = {
            project_type: projectType,
            pages: pages,
            design: design,
            features_count: document.querySelectorAll('.feature-checkbox:checked').length,
            features_total: featuresTotal
        };
        
        console.log('Calculator used:', eventData);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_used', {
                event_category: 'engagement',
                event_label: `${projectType}_${pages}_${design}`,
                value: featuresTotal
            });
        }
    }
}

// Portfolio Filter
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterItems(filter);
                this.updateActiveButton(e.target);
            });
        });
    }
    
    filterItems(filter) {
        this.portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
    }
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            ">
                <i class="fas fa-check-circle"></i>
                Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </div>
        `;
        
        this.form.appendChild(successMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

// Newsletter Handler
class NewsletterHandler {
    constructor() {
        this.form = document.getElementById('newsletter-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const email = document.getElementById('newsletter-email').value;
        const privacy = document.getElementById('newsletter-privacy').checked;
        
        if (!privacy) {
            this.showError('Veuillez accepter les conditions d\'utilisation');
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
        submitButton.disabled = true;
        
        // Simulate newsletter subscription (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Track newsletter subscription
            this.trackNewsletterSubscription(email);
        }, 2000);
    }
    
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.innerHTML = `
            <div style="
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            ">
                <i class="fas fa-check-circle"></i>
                Inscription réussie ! Vous recevrez bientôt nos conseils digitaux.
            </div>
        `;
        
        this.form.appendChild(successMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    showError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'newsletter-error';
        errorMessage.innerHTML = `
            <div style="
                background: #f44336;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            ">
                <i class="fas fa-exclamation-circle"></i>
                ${message}
            </div>
        `;
        
        this.form.appendChild(errorMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
    
    trackNewsletterSubscription(email) {
        // Track newsletter subscription for analytics
        console.log('Newsletter subscription:', email);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_subscription', {
                event_category: 'engagement',
                event_label: 'blog_newsletter',
                value: 1
            });
        }
    }
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.slider = document.querySelector('.testimonials-slider');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        if (this.cards.length > 1) {
            this.startAutoSlide();
        }
    }
    
    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    nextSlide() {
        this.cards[this.currentIndex].style.opacity = '0.5';
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.cards[this.currentIndex].style.opacity = '1';
    }
}

// Dark Mode Handler
class DarkModeHandler {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation to toggle button
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// Advanced Scroll Animations
class AdvancedScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.createObserver();
        this.addAnimationClasses();
        this.observeElements();
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add stagger effect for grid items
                    if (entry.target.classList.contains('animate-stagger')) {
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, index * 100);
                    }
                }
            });
        }, this.observerOptions);
    }
    
    addAnimationClasses() {
        // Add animation classes to various elements
        const elementsToAnimate = [
            { selector: '.service-card', class: 'animate-on-scroll' },
            { selector: '.pack-card', class: 'animate-scale' },
            { selector: '.portfolio-item', class: 'animate-on-scroll' },
            { selector: '.testimonial-card', class: 'animate-fade-in' },
            { selector: '.blog-card', class: 'animate-slide-left' },
            { selector: '.faq-item', class: 'animate-stagger' },
            { selector: '.trust-stat', class: 'animate-slide-right' },
            { selector: '.client-logo', class: 'animate-scale' }
        ];
        
        elementsToAnimate.forEach(({ selector, class: animationClass }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!el.classList.contains(animationClass)) {
                    el.classList.add(animationClass);
                }
            });
        });
    }
    
    observeElements() {
        const animatedElements = document.querySelectorAll([
            '.animate-on-scroll',
            '.animate-fade-in',
            '.animate-slide-left',
            '.animate-slide-right',
            '.animate-scale',
            '.animate-stagger'
        ].join(', '));
        
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Micro-interactions Handler
class MicroInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        this.addButtonHoverEffects();
        this.addCardHoverEffects();
        this.addFormFocusEffects();
        this.addParallaxEffect();
    }
    
    addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addCardHoverEffects() {
        const cards = document.querySelectorAll('.service-card, .pack-card, .portfolio-item, .blog-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px var(--shadow-medium)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px var(--shadow-light)';
            });
        });
    }
    
    addFormFocusEffects() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                input.style.boxShadow = 'none';
            });
        });
    }
    
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// WhatsApp Integration
class WhatsAppIntegration {
    constructor() {
        this.whatsappButton = document.querySelector('.whatsapp-button');
        this.init();
    }
    
    init() {
        // Add click tracking
        this.whatsappButton.addEventListener('click', () => {
            this.trackWhatsAppClick();
        });
    }
    
    trackWhatsAppClick() {
        // Track WhatsApp clicks for analytics
        console.log('WhatsApp button clicked');
        // Add your analytics tracking code here
    }
}

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
}

// SEO Optimizations
class SEOOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Add structured data
        this.addStructuredData();
        
        // Optimize meta tags
        this.optimizeMetaTags();
    }
    
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SiDigit",
            "description": "Agence digitale marocaine spécialisée dans la création de sites web, marketing digital et identité visuelle",
            "url": "https://sidigit.ma",
            "logo": "https://sidigit.ma/assets/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212-6-12-34-56-78",
                "contactType": "customer service",
                "availableLanguage": ["French", "Arabic"]
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Avenue Mohammed V",
                "addressLocality": "Casablanca",
                "postalCode": "20000",
                "addressCountry": "MA"
            },
            "sameAs": [
                "https://www.facebook.com/sidigit.ma",
                "https://www.twitter.com/sidigit_ma",
                "https://www.instagram.com/sidigit.ma",
                "https://www.linkedin.com/company/sidigit-ma"
            ]
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
    
    optimizeMetaTags() {
        // Add canonical URL
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.href;
        document.head.appendChild(canonical);
        
        // Add viewport meta tag if not present
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }
    }
}

// Custom Cursor Handler
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.init();
    }
    
    init() {
        if (!this.cursor || !this.cursorFollower) return;
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .pack-card, .portfolio-item, .faq-question');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorFollower.classList.add('cursor-follower-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new QuoteCalculator();
    new PortfolioFilter();
    new FAQAccordion();
    new ContactForm();
    new NewsletterHandler();
    new TestimonialsSlider();
    new DarkModeHandler();
    new AdvancedScrollAnimations();
    new MicroInteractions();
    new WhatsAppIntegration();
    new PerformanceOptimizer();
    new SEOOptimizer();
    new CustomCursor();
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics tracking (replace with your analytics code)
function trackEvent(category, action, label) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', action, {
            content_category: category,
            content_name: label
        });
    }
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    
    if (e.target.matches('.whatsapp-button')) {
        trackEvent('Contact', 'WhatsApp Click', 'Header');
    }
    
    if (e.target.matches('.portfolio-link')) {
        trackEvent('Portfolio', 'View Project', e.target.closest('.portfolio-item').querySelector('h3').textContent);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Send error to your error tracking service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        // Add your Core Web Vitals tracking here
    }
});
