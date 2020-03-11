/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navBarMenu = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to determine which page section is active

function isActive() {
    minVal = 5000;
    maxSection = sections [0];
    for (item of sections) {
        let position = item.getBoundingClientRect();
        if (position.top > -500 & position.top <= minVal) {
            minVal = position.top;
            maxSection = item;
        };
    };
    return maxSection;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav() {
    for (let item of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navBarMenu.appendChild(section);
    };
}

// Add class 'active' to section when near top of viewport

function addActiveClass () {
    window.addEventListener('scroll', function () {
        let section = isActive();
        section.classList.add('your-active-class');
        // remove active class from other sections
        for (let sect of sections) {
            if (sect.id !== section.id & sect.classList.contains('your-active-class')) {
                sect.classList.remove('your-active-class');
            }
        }
        // add header style
        const activeStyle = document.querySelector('li[data-nav="' + section.id + '"]');
        activeStyle.classList.add('section_active_style');
        
        // remove header style from other sections
        const headers = document.querySelectorAll('.menu__link');
        for (let head of headers) {
            if (head.dataset.nav !== activeStyle.dataset.nav & head.classList.contains('section_active_style')) {
                head.classList.remove('section_active_style');
            }
        };
    });
}

// Scroll to anchor ID using scrollTO event

function clickToSection() {
    navBarMenu.addEventListener('click', function (e) {
        const hasClicked = document.querySelector('#' + e.target.dataset.nav)
        hasClicked.scrollIntoView({behavior: "smooth"});
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

buildNav();

// Scroll to section on link click

clickToSection();

// Set sections as active

addActiveClass();
