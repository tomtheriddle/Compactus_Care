document.addEventListener('DOMContentLoaded', function() {
    try {
        const body = document.body;
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const headerCenter = document.querySelector('.header-center');
        const menuItems = headerCenter.querySelectorAll('a');

        console.log('Mobile menu toggle:', mobileMenuToggle);
        console.log('Mobile menu close:', mobileMenuClose);
        console.log('Header center:', headerCenter);

        if (!mobileMenuToggle || !mobileMenuClose || !headerCenter) {
            throw new Error('One or more required elements not found');
        }

        // Initialize menu state
        let isMenuActive = false;

        function logComputedStyle(element, prefix) {
            const style = window.getComputedStyle(element);
            console.log(`${prefix} - display:`, style.display);
            console.log(`${prefix} - visibility:`, style.visibility);
            console.log(`${prefix} - opacity:`, style.opacity);
            console.log(`${prefix} - z-index:`, style.zIndex);
        }

        function setMenuState(active) {
            isMenuActive = active;
            headerCenter.classList.toggle('active', active);
            mobileMenuToggle.classList.toggle('active', active);
            body.classList.toggle('menu-active', active);
            headerCenter.style.display = active ? 'flex' : 'none';
            headerCenter.style.visibility = active ? 'visible' : 'hidden';
            headerCenter.style.opacity = active ? '1' : '0';
        }

        function toggleMobileMenu(event) {
            console.log('Toggle mobile menu called');
            console.log('Event target:', event.target);
            
            console.log('Before toggle - Menu active:', isMenuActive);
            logComputedStyle(headerCenter, 'Before toggle');
            
            setMenuState(!isMenuActive);
            
            console.log('After toggle - Menu active:', isMenuActive);
            logComputedStyle(headerCenter, 'After toggle');
            
            // Force a reflow
            void headerCenter.offsetWidth;
            
            // Add a small delay to check if styles are applied after a short time
            setTimeout(() => {
                console.log('After 100ms delay:');
                logComputedStyle(headerCenter, 'Delayed check');
            }, 100);
        }

        function closeMenu() {
            setMenuState(false);
        }

        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', toggleMobileMenu);

        // Add click event listeners to menu items
        menuItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Initialize menu state
        setMenuState(false);

        console.log('Event listeners added and menu initialized');
    } catch (error) {
        console.error('An error occurred in mobile-menu.js:', error);
    }
});
