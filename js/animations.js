// Initialize AOS with custom settings
AOS.init({
    duration: 1000,
    once: true,
    mirror: true
});

// Initialize Typed.js with more options
const typed = new Typed('.typed-text', {
    strings: [
        'coding 💻',
        'making videos 🎥',
        'teaching tech 👨‍🏫',
        'building apps 📱'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    cursorChar: '|'
});

// Initialize Tilt.js
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

gsap.to(scrollProgress, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

// Animate skill progress bars
const animateSkills = () => {
    document.querySelectorAll('.progress').forEach(progress => {
        const value = progress.getAttribute('data-value');
        gsap.to(progress, {
            width: `${value}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: progress,
                start: 'top 80%'
            }
        });
    });
};

// Enhanced number counter animation
const animateCounter = (counter, target) => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    const stepSize = target / steps;
    let current = 0;
    
    const updateCounter = () => {
        current += stepSize;
        if (current > target) current = target;
        counter.textContent = Math.floor(current).toLocaleString();
        
        if (current < target) {
            setTimeout(updateCounter, stepDuration);
        }
    };
    
    updateCounter();
};

// Initialize counter animations when in view
const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                onEnter: () => animateCounter(counter, target)
            }
        });
    });
};

// Call the function to initialize counters
initCounters();

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    gsap.to('.hero-content', {
        x: moveX,
        y: moveY,
        duration: 1
    });
});

// Scroll animations for numbers
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Add smooth reveal animation for stats
gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Enhanced progress bar animation
const animateProgress = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(progress => {
        const value = progress.getAttribute('data-value');
        const percentage = progress.parentElement.nextElementSibling;
        
        gsap.to(progress, {
            width: `${value}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: progress,
                start: "top 80%",
                onEnter: () => {
                    // Animate percentage number
                    let currentValue = 0;
                    const targetValue = parseInt(percentage.textContent);
                    const duration = 1500;
                    const step = timestamp => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        currentValue = Math.min(
                            targetValue,
                            Math.floor((progress / duration) * targetValue)
                        );
                        percentage.textContent = `${currentValue}%`;
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    let start = null;
                    window.requestAnimationFrame(step);
                    
                    // Add animation class
                    progress.style.animation = 'fillProgress 1.5s ease-out forwards';
                }
            }
        });
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateProgress();
    
    // Add hover effect for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progress = card.querySelector('.progress');
            progress.style.animation = 'shimmer 1.5s infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            const progress = card.querySelector('.progress');
            progress.style.animation = 'none';
        });
    });
});

// Update the progress values in HTML
const updateProgressValues = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        const percentage = progress.parentElement.nextElementSibling;
        progress.setAttribute('data-value', percentage.textContent.replace('%', ''));
    });
};

updateProgressValues();

// Enhanced Scroll Animations
const scrollAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Navbar Background
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            const navbar = document.querySelector('.navbar');
            if (self.direction === 1) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth Section Reveals
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true
            }
        });
    });
};

// Enhanced Mobile Menu
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
};

// Enhanced Particle Effects
const initParticles = () => {
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
};

// Initialize All Animations
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations();
    initMobileMenu();
    initParticles();
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
});

// Fix Smooth Scrolling
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