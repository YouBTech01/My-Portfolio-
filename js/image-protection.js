// Image Protection
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.profile-image')) {
            e.preventDefault();
        }
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent PrintScreen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }

        // Prevent Ctrl + S, Ctrl + C, Ctrl + U, Ctrl + P
        if (e.ctrlKey && (e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'p')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
        if (e.target.closest('.profile-image')) {
            e.preventDefault();
        }
    });

    // Additional protection for mobile devices
    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('.profile-image')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Disable save image
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
});

// Additional protection against DevTools
setInterval(() => {
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.style.opacity = '0.99';
        setTimeout(() => {
            profileImage.style.opacity = '1';
        }, 1);
    }
}, 1000); 