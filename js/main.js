// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    };

    // Add click event listeners to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (link.getAttribute('href') !== '#') {
            link.addEventListener('click', smoothScroll);
        }
    });

    // Enhanced Mobile Menu Functionality
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links a');
        let isMenuOpen = false;

        const toggleMenu = (show) => {
            isMenuOpen = show;
            hamburger.classList.toggle('active', show);
            navLinks.classList.toggle('active', show);
            document.body.classList.toggle('menu-open', show);

            // Animate links
            navLinksItems.forEach((link, index) => {
                if (show) {
                    link.style.transitionDelay = `${index * 0.1}s`;
                    link.classList.add('show');
                } else {
                    link.style.transitionDelay = '0s';
                    link.classList.remove('show');
                }
            });
        };

        // Hamburger click handler
        hamburger?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(!isMenuOpen);
        });

        // Close menu when clicking links
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && isMenuOpen) {
                    toggleMenu(false);
                }
            }, 250);
        });

        // Handle scroll behavior
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !isMenuOpen) {
                // Scrolling down & menu is closed
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll) {
                // Scrolling up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    };

    initMobileMenu();

    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#00BFFF' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    }
                }
            }
        });
    }
});

// Prevent errors from missing elements
window.addEventListener('error', (e) => {
    if (e.message.includes('Cannot read properties of null')) {
        console.warn('Element not found:', e.message);
        return true; // Prevent error from showing in console
    }
}); 