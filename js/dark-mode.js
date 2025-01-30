// Dark Mode Implementation
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to toggle dark mode
const toggleDarkMode = (isDark) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update icon
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    // Add transition class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
};

// Initialize dark mode
const initDarkMode = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        toggleDarkMode(savedTheme === 'dark');
    } else {
        toggleDarkMode(prefersDarkScheme.matches);
    }
};

// Event Listeners
darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleDarkMode(!isDark);
});

prefersDarkScheme.addEventListener('change', (e) => {
    toggleDarkMode(e.matches);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode); 