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

sliderDetect(main_swiper.sliderItems, main_swiper.sliderContainer, main_swiper.controlL, main_swiper.controlR);