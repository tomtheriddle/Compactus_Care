// Pop-up functionality
function initializePopup() {
    const popup = document.getElementById('product-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDetails = document.getElementById('popup-details');
    const popupImage = document.getElementById('popup-image');

    // Product details (you may want to move this to a separate file or fetch from a server)
    const productDetails = {
        'standard-compactus': {
            title: 'Standard Compactus System',
            details: 'Our Standard Compactus System offers efficient mobile shelving for maximum storage capacity. It\'s perfect for offices, libraries, and archives looking to optimize their space.',
            images: ['compactus.jpg', 'compactus3.jpg', 'compactus4.jpg', 'compactus5.jpg']
        },
        'industrial-racking': {
            title: 'Industrial Racking Solution',
            details: 'Our Industrial Racking Solution provides heavy-duty storage for warehouses and industrial spaces. It\'s designed to handle large and heavy items with ease.',
            images: ['racking.jpg', 'racking4.jpg', 'racking5.jpg', 'racking6.jpg']
        },
        'maintenance-callback': {
            title: 'Maintenance Call Back',
            details: 'Our Maintenance Call Back service ensures your storage systems are always in top condition. Schedule regular check-ups to prevent issues and extend the life of your equipment.',
            images: ['maintenance.jpg', 'maintenance3.jpg', 'maintenance4.jpg', 'maintenance5.jpg']
        }
    };

    // Open popup
    function openPopup(product) {
        const details = productDetails[product];
        if (details && popup && popupTitle && popupDetails) {
            popupTitle.textContent = details.title;
            popupDetails.textContent = details.details;
        
            const popupImages = document.querySelector('.popup-images');
            popupImages.innerHTML = ''; // Clear existing images
        
            details.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = details.title;
                img.style.width = `${Math.floor(Math.random() * (100 - 50 + 1)) + 50}%`; // Random width between 50% and 100%
                popupImages.appendChild(img);
            });
        
            popup.style.display = 'block';
        }
    }

    // Close popup
    function closePopupHandler() {
        if (popup) {
            popup.style.display = 'none';
        }
    }

    // Event listeners for view details links
    document.querySelectorAll('.view-details').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.getAttribute('data-product');
            if (product) {
                openPopup(product);
            }
        });
    });

    // Event listener for closing popup
    if (closePopup) {
        closePopup.addEventListener('click', closePopupHandler);
    }

    // Close popup when clicking outside
    if (popup) {
        window.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopupHandler();
            }
        });
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerCenter = document.querySelector('.header-center');

    if (mobileMenuToggle && headerCenter) {
        mobileMenuToggle.addEventListener('click', function() {
            headerCenter.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

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

    // Smooth scrolling for internal links (excluding 'View Details' buttons)
    document.querySelectorAll('a[href^="#"]:not(.view-details)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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

    // Initialize popup functionality
    initializePopup();
});
