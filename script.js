// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.problem-item, .solution-card, .testimonial-card, .pricing-card, .step-card, .key-takeaways'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Video play functionality
    const videoPlaceholders = document.querySelectorAll('.video-placeholder, .video-thumb');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or player
            console.log('Video clicked - would open video player here');
            alert('In a live website, this would play the video. Replace the video-placeholder with actual video embed code.');
        });
    });

    // Pricing card hover effect enhancement
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Dynamic WhatsApp message based on package
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track which package was clicked (for analytics)
            const packageName = this.closest('.pricing-card')?.querySelector('.package-title')?.textContent;
            if (packageName) {
                console.log('Package selected:', packageName);
                // You can send this to analytics
            }
        });
    });

    // Scroll progress indicator (optional enhancement)
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // You can use this to show a progress bar if desired
        // Example: document.querySelector('.progress-bar').style.width = scrolled + '%';
    });

    // Testimonials auto-scroll on mobile (optional)
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (testimonialGrid && window.innerWidth <= 768) {
        let isScrolling = false;
        
        testimonialGrid.addEventListener('touchstart', function() {
            isScrolling = true;
        });
        
        testimonialGrid.addEventListener('touchend', function() {
            isScrolling = false;
        });
    }

    // Counter animation for stats (can be used for ratings)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate rating number when visible
    const ratingDisplay = document.querySelector('.rating-display');
    if (ratingDisplay) {
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(ratingDisplay, 0, 4.9, 2000);
                    ratingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        ratingObserver.observe(ratingDisplay);
    }

    // Mobile menu toggle (if you add a mobile menu)
    const createMobileMenu = () => {
        // This is a placeholder for mobile menu functionality
        // Can be expanded if needed
    };

    // Lazy loading for images (if you add real product images)
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

    // Form validation (if you add a contact form)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    };

    // Scroll to top functionality (optional)
    const createScrollToTop = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-green);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 999;
        `;

        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
            } else {
                scrollBtn.style.opacity = '0';
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Uncomment to enable scroll to top button
    // createScrollToTop();

    // Track time on page (for analytics)
    let pageStartTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        console.log('Time on page:', timeOnPage, 'seconds');
        // Send to analytics service
    });

    // Add click tracking for important CTAs
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            console.log('CTA clicked:', {
                position: index,
                text: this.textContent.trim(),
                section: this.closest('section')?.className || 'unknown'
            });
            // Send to analytics
        });
    });

    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Add ripple effect to buttons
    const addRippleEffect = (button) => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    };

    // Add ripple to all CTA buttons
    document.querySelectorAll('.cta-button').forEach(addRippleEffect);

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Console welcome message
    console.log('%cVitaForce Pro Website', 'font-size: 20px; font-weight: bold; color: #2d5016;');
    console.log('%cBuilt with care for optimal performance and user experience', 'color: #666;');

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            }, 0);
        });
    }
});

// Utility function for debouncing scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce };
}
