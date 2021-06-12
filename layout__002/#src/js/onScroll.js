const MENU = document.querySelector(".menu__list");
const LINKS = document.querySelectorAll(".menu__list a");

// SCROLL
document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPosition = window.scrollY;
    const divs = document.querySelectorAll('.page>div'); // ДИВЫ ВЕРХНЕГО УРОВНЯ
    // console.log(curPosition);
    divs.forEach((el) => {
        el.getAttribute('id');

        if (el.offsetTop <= curPosition && (el.offsetTop + el.offsetHeight) > curPosition) {

            LINKS.forEach((a) => {
                a.classList.remove("active");

                // Обрезаемаем первый знак  в якоре
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add("active");
                }
            })
        }
    });
}
