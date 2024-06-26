



/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab=>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab=>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})




/*====================  SWIPER  ====================*/

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.project__container', {
        slidesPerView: 1, // Initially set to 1 for mobile view
        spaceBetween: 20, // Adjust spacing between slides
        loop: true, // Optional: loop slides if needed
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2, // Show 2 slides on desktop (768px and above)
            },
        },
    });

    // Optional: Add event listeners for navigation buttons
    var prevButton = document.querySelector('.swiper-button-prev');
    var nextButton = document.querySelector('.swiper-button-next');

    prevButton.addEventListener('click', function () {
        swiper.slidePrev();
    });

    nextButton.addEventListener('click', function () {
        swiper.slideNext();
    });

    // Optional: Add event listener for slide change
    swiper.on('slideChange', function () {
        // Add your logic here if needed
    });
});


/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    let isScrolling = false;

    // Debounce function to prevent rapid execution
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Intersection Observer for sections
    const observer = new IntersectionObserver(debounce((entries) => {
        if (isScrolling) return; // Skip observer updates during manual navigation

        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }), { threshold: 0.5 }); // Single threshold value for better accuracy

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle click events on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            isScrolling = true;

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offsetTop = targetElement.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active link immediately
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            // Allow intersection observer to re-enable after scrolling ends
            setTimeout(() => {
                isScrolling = false;
            }, 500); // Adjust timeout based on scroll duration
        });
    });

    // Qualification tabs functionality
    const tabs = document.querySelectorAll('[data-target]');
    const tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);

            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualification__active');
            });
            target.classList.add('qualification__active');

            tabs.forEach(tab => {
                tab.classList.remove('qualification__active');
            });
            tab.classList.add('qualification__active');
        });
    });

    // Extra observer for qualification subsections
    const qualificationObserver = new IntersectionObserver(debounce((entries) => {
        entries.forEach(entry => {
            if (isScrolling) return; // Skip observer updates during manual navigation

            const parentSection = entry.target.closest('section').getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${parentSection}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }), { threshold: 0.5 });

    const qualificationSubSections = document.querySelectorAll('#qualification [data-content]');
    qualificationSubSections.forEach(subSection => {
        qualificationObserver.observe(subSection);
    });
});



/*==================== CHANGE BACKGROUND HEADER ====================*/ 

 


/*==================== DARK LIGHT THEME ====================*/ 
const themeButtonMoon = document.getElementById('theme-button-moon');
const themeButtonSun = document.getElementById('theme-button-sun');
const darkThemeClass = 'dark';

// Function to toggle theme and icons
const toggleTheme = () => {
    // Toggle the dark theme class on the body
    document.body.classList.toggle(darkThemeClass);

    // Check if body now has dark-theme class
    const isDarkMode = document.body.classList.contains(darkThemeClass);

    // Toggle visibility of moon and sun icons based on dark mode state
    if (isDarkMode) {
        themeButtonMoon.classList.add('hide'); // Moon hidden in dark mode
        themeButtonSun.classList.remove('hide'); // Sun visible in dark mode
    } else {
        themeButtonMoon.classList.remove('hide'); // Moon visible in light mode
        themeButtonSun.classList.add('hide'); // Sun hidden in light mode
    }

    // Save the theme the user chose
    localStorage.setItem('selected-theme', isDarkMode ? 'dark' : 'light');
};

// Check if there's a previously saved theme and apply it
const savedTheme = localStorage.getItem('selected-theme');
if (savedTheme === 'dark') {
    document.body.classList.add(darkThemeClass);
    themeButtonMoon.classList.add('hide'); // Moon hidden in dark mode
    themeButtonSun.classList.remove('hide'); // Sun visible in dark mode
} else {
    document.body.classList.remove(darkThemeClass);
    themeButtonMoon.classList.remove('hide'); // Moon visible in light mode
    themeButtonSun.classList.add('hide'); // Sun hidden in light mode
}

// Event listener for clicking on the moon icon
themeButtonMoon.addEventListener('click', toggleTheme);

// Event listener for clicking on the sun icon
themeButtonSun.addEventListener('click', toggleTheme);

// Mobile menu functionality
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Function to open mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        // Hide theme toggle button when mobile menu is opened
        themeButtonMoon.classList.add('hide');
        themeButtonSun.classList.add('hide');
    });
}

// Function to close mobile menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        // Show theme toggle button when mobile menu is closed
        const isDarkMode = document.body.classList.contains(darkThemeClass);
        if (isDarkMode) {
            themeButtonMoon.classList.add('hide');
            themeButtonSun.classList.remove('hide');
        } else {
            themeButtonMoon.classList.remove('hide');
            themeButtonSun.classList.add('hide');
        }
    });
}

// Functionality to close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        // Show theme toggle button when mobile menu is closed
        const isDarkMode = document.body.classList.contains(darkThemeClass);
        if (isDarkMode) {
            themeButtonMoon.classList.add('hide');
            themeButtonSun.classList.remove('hide');
        } else {
            themeButtonMoon.classList.remove('hide');
            themeButtonSun.classList.add('hide');
        }
    });
});



/*====================  SCROLL reveal ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 1400,
    reset: true
});

sr.reveal(`.home__data, .home__img, 
.home__social, .qualification__tabs, 
.skills__container, .project__container, 
.section__title, .section__subtitle, 
.section__border, .gallery__container, 
.thanks__data, .thanks__image`, 
{
    interval: 100, reset: false
})

// dark mode animation