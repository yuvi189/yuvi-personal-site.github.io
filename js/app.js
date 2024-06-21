



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

let swiperProject = new Swiper(".project__container", {
    loop: true,
    cssMode: true,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: 54,
        },
    },
  });
/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    let isScrolling = false;

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.5 }); // Adjusted threshold for better accuracy

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
            }, 1000); // Adjust timeout based on scroll duration
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
    const qualificationObserver = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.5 });

    const qualificationSubSections = document.querySelectorAll('#qualification [data-content]');
    qualificationSubSections.forEach(subSection => {
        qualificationObserver.observe(subSection);
    });
});


/*==================== CHANGE BACKGROUND HEADER ====================*/ 

 


/*==================== DARK LIGHT THEME ====================*/ 
const themeButtonMoon = document.getElementById('theme-button-moon');
const themeButtonSun = document.getElementById('theme-button-sun');
const darkTheme = 'dark-theme';

// Function to toggle theme and icons
const toggleTheme = () => {
    // Toggle the dark theme class on the body
    document.body.classList.toggle(darkTheme);

    // Check if body now has dark-theme class
    const isDarkMode = document.body.classList.contains(darkTheme);

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
    document.body.classList.add(darkTheme);
    themeButtonMoon.classList.add('hide'); // Moon hidden in dark mode
    themeButtonSun.classList.remove('hide'); // Sun visible in dark mode
} else {
    document.body.classList.remove(darkTheme);
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
        const isDarkMode = document.body.classList.contains(darkTheme);
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
        const isDarkMode = document.body.classList.contains(darkTheme);
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