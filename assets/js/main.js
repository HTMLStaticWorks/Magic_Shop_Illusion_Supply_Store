document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';

    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
        });
    });

    function updateThemeIcon(theme) {
        const icons = document.querySelectorAll('.theme-toggle-btn i, #theme-toggle i');
        icons.forEach(icon => {
            icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        });
    }

    // RTL/LTR Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle');
    if (rtlToggles.length > 0) {
        rtlToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const currentDir = htmlElement.getAttribute('dir') || 'ltr';
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
                htmlElement.setAttribute('dir', newDir);
                updateRTLText(newDir);
                localStorage.setItem('dir', newDir);
            });
        });
    }

    function updateRTLText(dir) {
        const toggles = document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle');
        toggles.forEach(toggle => {
            if (toggle.tagName === 'BUTTON' || toggle.tagName === 'A') {
                toggle.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                        node.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
                    }
                });
            }
        });
    }

    // Initialize Dir from LocalStorage
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);
    updateRTLText(savedDir);

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('#menu-btn i');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            menuIcon.className = mobileMenu.classList.contains('hidden') ? 'ri-menu-line' : 'ri-close-line';
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('i');
            
            // Toggle active state
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close other items
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                otherItem.querySelector('i').style.transform = 'rotate(0deg)';
                otherItem.classList.remove('border-neonPurple/50');
            });

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
                item.classList.add('border-neonPurple/50');
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('nav');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // Particle/Spotlight Follow
    document.addEventListener('mousemove', (e) => {
        const spotlights = document.querySelectorAll('.spotlight-follow');
        spotlights.forEach(spot => {
            const x = e.clientX;
            const y = e.clientY;
            spot.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
        });
    });
});
