// Main JavaScript file for Compactus Care website

document.addEventListener('DOMContentLoaded', function() {
    // Get a Quote button functionality
    const getQuoteButtons = document.querySelectorAll('.cta-button[aria-label="Get a Quote"], .cta-button.secondary, .header-right .cta-button');
    getQuoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to the contact form
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Explore Services button functionality
    const exploreServicesButton = document.querySelector('.hero .cta-button:not(.secondary)');
    if (exploreServicesButton) {
        exploreServicesButton.addEventListener('click', function() {
            // Scroll to the services section
            document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Learn More links functionality
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, we'll just show an alert. In a real scenario, this would open a modal or navigate to a details page.
            alert('More details about this service/product will be shown here.');
        });
    });

    // Product filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const products = document.querySelectorAll('.product');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
});

console.log('main.js loaded and executed');
