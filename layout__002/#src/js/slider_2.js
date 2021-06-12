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
window.addEventListener("resize", slider_lots); // ПРИ СМЕНЕ РАЗМЕРА ЭКРАНА