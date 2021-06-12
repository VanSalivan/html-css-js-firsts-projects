// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle
"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
;
function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();;
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
;
let main_swiper = {
    sliderItems: document.querySelectorAll(".item-main-slider"),
    sliderContainer: document.querySelector(".main-slider"),
    controlL: document.querySelector(".left"),
    controlR: document.querySelector(".right"),
};

const sliderDetect = (sliders, sliderContainer, buttonLeft, buttonRight) => {
    let items = sliders;
    let activeItem = 0; // ИНДЕКС Текущего слайда
    let isEnabled = true; // Флаг НАЧАЛА анимации / FALSE - КОНЦА анимации

    let controlLeft = buttonLeft;
    let controlRight = buttonRight;

    function changeActiveItem(n) {
        // Если доходит до активного индекса(2) при деление на (2) возвращается в 0 
        activeItem = (n + items.length) % items.length;
    };

    // ============== Добавление/Удаление классов =============================================

    function hideItem(direction) {
        isEnabled = false;
        items[activeItem].classList.add(direction);
        items[activeItem].addEventListener('animationend', function () {
            this.classList.remove("_active", direction);
        });
    };

    function showItem(direction) {
        items[activeItem].classList.add("next", direction);
        items[activeItem].addEventListener('animationend', function () {
            this.classList.remove("next", direction);
            this.classList.add("_active");
            isEnabled = true;
        });
    };

    // =========================================================================================

    function previousItem(n) {
        hideItem("to-right");
        changeActiveItem(n - 1);
        showItem("from-left");
    };

    function nextItem(n) {
        hideItem("to-left");
        changeActiveItem(n + 1);
        showItem("from-right");
    };

    // ==========================================================================================

    controlLeft.addEventListener('click', function () {
        if (isEnabled) { // TRUE
            previousItem(activeItem);
        }
    });

    controlRight.addEventListener('click', function () {
        if (isEnabled) { // TRUE
            nextItem(activeItem);
        }
    });

    // =================== SWIPER ================================================================

    const swiperDetect = (element) => {

        let surface = element; // Элемент который передаем / Замкнут 
        let startX = 0; // Начало отслеживания оси Х (ширине)
        let startY = 0; // Начало отслеживания оси Y (высоте)
        let distX = 0; // Прошедшая дистанция по оси Х
        let distY = 0; // Прошедшая дистанция по оси Y

        let distance = 100; // Дистанция от которой можно активировать свайп
        let restraint = 100; // Ограничение действий по высоте

        let startTime = 0; // Время начала движения
        let elapsedTime = 0; // Время до конца
        let allowedTime = 300; // Время которое должен длиться свайп


        //================== SWIPER DESKTOP ========================================================================   
        // surface.addEventListener('mousedown', function (e) {
        //     startX = e.pageX;
        //     startY = e.pageY;

        //     startTime = new Date().getTime(); // Получаем время нажатия
        //     e.preventDefault(); // Останавливаем другие события при клике
        // });

        // surface.addEventListener('mouseup', function (e) {
        //     distX = e.pageX - startX; // положение PageX при (mouseup) - Положение от начажия(mousedown)
        //     distY = e.pageY - startY; // положение по Высоте

        //     elapsedTime = new Date().getDate() - startTime; // время ОТПУСКАНИЯ/mouseup - время НАЖАТИЯ/mousedown

        //     if (elapsedTime <= allowedTime) {
        //         if (Math.abs(distX) >= distance && Math.abs(distY) <= restraint) {
        //             if (distX > 0) {
        //                 if (isEnabled) { // проверка на разрешенную анимацию
        //                     previousItem(activeItem);
        //                 }
        //             } else {
        //                 if (isEnabled) {
        //                     nextItem(activeItem);
        //                 }
        //             }
        //         }
        //     }

        //     e.preventDefault(); // Останавливаем другие события при клике
        // });
        //================== /SWIPER DESKTOP =====================================================================
        //================== SWIPER MOBILE =======================================================================

        surface.addEventListener('touchstart', function (e) {
            // Для работы стрелок экрана ПЛАНШЕТА
            if (e.target.classList.contains("arrow") || e.target.classList.contains("slider__control")) {

                if (e.target.classList.contains("left")) {
                    if (isEnabled) { // проверка на разрешенную анимацию
                        previousItem(activeItem);
                    }
                } else if (e.target.classList.contains("right")) {
                    if (isEnabled) {
                        nextItem(activeItem);
                    }
                }
            }

            // не можем получить pageX и pageY напрямую из эвента
            let touchObject = e.changedTouches[0];
            startX = touchObject.pageX;
            startY = touchObject.pageY;

            startTime = new Date().getTime(); // Получаем время нажатия

            // e.preventDefault(); // Останавливаем другие события при клике
        });

            surface.addEventListener('touchmove', function (e) {
                e.preventDefault();
            });

        surface.addEventListener('touchend', function (e) {
            let touchObject = e.changedTouches[0];
            distX = touchObject.pageX - startX; // положение PageX при (mouseup) - Положение от начажия(mousedown)
            distY = touchObject.pageY - startY; // положение по Высоте

            elapsedTime = new Date().getDate() - startTime; // время ОТПУСКАНИЯ/mouseup - время НАЖАТИЯ/mousedown

            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= distance && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        if (isEnabled) {
                            previousItem(activeItem);
                        }
                    } else {
                        if (isEnabled) {
                            nextItem(activeItem);
                        }
                    }
                }
            }

            // e.preventDefault(); // Останавливаем другие события при клике
        });
    }

    swiperDetect(sliderContainer); // КОНТЕЙНЕР СЛАЙДЕРА
};

sliderDetect(main_swiper.sliderItems, main_swiper.sliderContainer, main_swiper.controlL, main_swiper.controlR);;
let slider_lots = function () {

    let position = 0; // позиция переопределения скролла
    let slidesShow = 3; // Сколько Элементов позазывать
    let slidesSсroll = 1; // Сколько Элементов скролить

    let client_w = document.documentElement.clientWidth;

    const container = document.querySelector(".slider-lots");
    const track = document.querySelector(".slider-lots__body");
    const items = document.querySelectorAll(".slider-lots__slide");

    checkScreenWidth();

    const itemsCount = items.length; // Суммарное кол-во элементов (длину)

    const btnNext = document.querySelector(".control-slider-lots__arrow_next");
    const btnPrev = document.querySelector(".control-slider-lots__arrow_prev");

    let itemWidth = container.clientWidth / slidesShow; // ширина каждого элемента = Ширина Элемента / кол-во отображаемых элементов
    const movePostition = slidesSсroll * itemWidth; // количество элементов перемещения * ширину элемента

    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`; // каждому элементу присваиваем вычисленную ширину (itemWidth)
    });

    btnPrev.addEventListener('click', function () {
        // Осталось элементов
        const itemLeft = (Math.abs(position) / itemWidth)

        position += itemLeft >= slidesSсroll ? movePostition : itemLeft * itemWidth;

        setPosition();
        checkButtons();
    });

    btnNext.addEventListener('click', function () {
        // Осталось элементов
        const itemLeft = itemsCount - (Math.abs(position) + slidesShow * itemWidth) / itemWidth;

        position -= itemLeft >= slidesSсroll ? movePostition : itemLeft * itemWidth;

        setPosition();
        checkButtons();
    });

    const setPosition = () => { // смещение скролла
        track.style.transform = `translateX(${position}px)`
    };

    const checkButtons = () => { // Проверяем активность кнопок
        btnPrev.disabled = position === 0; // добавляем атрибут disabled если позиция скролла равна 0

        btnNext.disabled = position <= -(itemsCount - slidesShow) * itemWidth
        // Кол-во элементов - число видимых слайдов * на ширину каждого элемента 
        // - отрицательное значение принимает трек движущийся в лево (-128px) 
    };

    function checkScreenWidth() {
        let breakPointTablet = 992;
        let breakPointMobile = 550;

        if (client_w <= breakPointTablet) slidesShow = 2;
        if (client_w <= breakPointMobile) slidesShow = 1;
    };

    checkButtons();
};

slider_lots(); 
window.addEventListener("resize", slider_lots); // ПРИ СМЕНЕ РАЗМЕРА ЭКРАНА;
;
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
