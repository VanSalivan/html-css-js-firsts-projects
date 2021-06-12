@@include('./app.js');
//----------------------------------------------

const USER_ICON = document.querySelector(".user-header__icon");
const MOBILE_BACKGROUND = document.querySelector(".menu__body");
const BURGER_BUTTON = document.querySelector(".burger-menu");
let userMenu = document.querySelector(".user-header__menu");

USER_ICON.addEventListener('click', function (e) {
    userMenu.classList.toggle("_active");
});

BURGER_BUTTON.addEventListener('click', (event) => {

    MOBILE_BACKGROUND.classList.toggle("_active");

    if (MOBILE_BACKGROUND.classList.value === "menu__body _active") {
        BURGER_BUTTON.style.transform = 'rotate(90deg)';
    } else {
        BURGER_BUTTON.style.transform = 'rotate(0)'
    };
});

document.addEventListener('click', function (e) {
    if (!e.target.closest(".user-header")) {
        userMenu.classList.remove("_active");
    }
});

// HEADER NAVIGATION
MENU.addEventListener('click', (event) => {
    LINKS.forEach(el => el.classList.remove("active"));

    event.target.classList.add("active");

    if (event.target.classList.value === 'menu__link active') {
        MOBILE_BACKGROUND.classList.remove('_active');
        BURGER_BUTTON.style.transform = 'rotate(0)';
    }
});
