// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Debounce function for performance optimization
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Product filtering with event delegation
    const productsContainer = document.querySelector('.products-list');
    const filterButtons = document.querySelectorAll('.filter-button');

    if (productsContainer && filterButtons) {
        document.querySelector('.product-filters').addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-button')) {
                const filter = e.target.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                productsContainer.querySelectorAll('.product').forEach(product => {
                    if (filter === 'all' || product.getAttribute('data-category') === filter) {
                        product.style.display = 'flex';
                        setTimeout(() => {
                            product.style.opacity = '1';
                        }, 10);
                    } else {
                        product.style.opacity = '0';
                        setTimeout(() => {
                            product.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    }

    // Improved testimonial carousel
    const testimonialContainer = document.querySelector('.testimonial-carousel');
    const testimonials = testimonialContainer ? testimonialContainer.querySelectorAll('.testimonial') : [];
    let currentTestimonial = 0;

    function showNextTestimonial() {
        if (testimonials.length > 0) {
            testimonials[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.opacity = '1';
        }
    }

    // Change testimonial every 5 seconds with fade effect
    if (testimonials.length > 0) {
        setInterval(showNextTestimonial, 5000);
    }

    // Smooth scrolling for all links, including 'Learn More' and 'View Details'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = debounce((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    });

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});
