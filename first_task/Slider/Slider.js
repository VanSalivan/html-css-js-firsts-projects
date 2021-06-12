let arr = [
  {
    date: 1559419200000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false,
    image: 'Sun.png'
  },
  {
    date: 1559505600000,
    temperature: {
      night: 19,
      day: 29
    },
    cloudiness: "Облачно",
    snow: false,
    rain: false,
    image: 'Cloud.png'
  },
  {
    date: 1559592000000,
    temperature: {
      night: 12,
      day: 21
    },
    cloudiness: "Облачно",
    snow: false,
    rain: false,
    image: 'Cloud.png'
  },
  {
    date: 1559678400000,
    temperature: {
      night: 16,
      day: 27
    },
    cloudiness: "Облачно",
    snow: false,
    rain: true,
    image: 'Rain.png'
  },
  {
    date: 1559764800000,
    temperature: {
      night: 17,
      day: 28
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false,
    image: 'Sun.png'
  },
  {
    date: 1559851200000,
    temperature: {
      night: 18,
      day: 25
    },
    cloudiness: "Облачно",
    snow: false,
    rain: false,
    image: 'Cloud.png'
  },
  {
    date: 1559937600000,
    temperature: {
      night: 21,
      day: 29
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false,
    image: 'Sun.png'
  },
];

//Карточки с данными
//------------------------------------------------------------------------------------------------
let slider = document.getElementsByClassName("middle-main-blue");

let createElement = function (element, classname, text, attribute, attributeValue) {
  let result = document.createElement(element);
  result.className = classname;
  if (text) {
    result.innerHTML = text;
  }
  else if (attribute) {
    result.setAttribute(attribute, attributeValue)
  }
  return result;
};

function checkClouds(rain, snow) {
  let cloudsCondition = (rain && snow) ? "Cнег с дождем" : (!rain && !snow) ? 'Без осадков' : (rain === true) ? "Дождь" : "Снег";
  return cloudsCondition
};

arr.map(function (item) {
  let arrDate = new Date(item.date);
  

  let dayMonth = { month: 'long', day: 'numeric'};
  let weekday = { weekday: 'long' };

  let card = createElement("div", "item-red");
  let cardToday = createElement("p", "item-today", arrDate.toLocaleString("ru", weekday));
  let cardDate = createElement("p", "item-day", arrDate.toLocaleString("ru", dayMonth));
  let tempDay = createElement("p", "item-temperature-day", `днём ${item.temperature.day}°`);
  let tempNight = createElement("p", "item-temperature-night", ` ночью ${item.temperature.night}°`);
  let cardImg = createElement("img", "item-img", "", "src", item.image);
  let cardClouds = createElement("p", "item-clouds", item.cloudiness);
  let cardCloudsCondition = createElement('p', 'item-clouds', checkClouds(item.rain, item.snow));


  card.append(cardToday);
  card.append(cardDate);
  card.append(cardImg);
  card.append(tempDay);
  card.append(tempNight);
  card.append(cardClouds);
  card.append(cardCloudsCondition);
  slider[0].append(card);
});


//Движение карт слайдера
//------------------------------------------------------------------------------------------------
let left = 1 ;
document.getElementById("prev-button").style.display = 'none';
document.getElementById("next-button").onclick = moveLeft;
document.getElementById("prev-button").onclick = moveRight;


function moveLeft() {
  
  if (left < - 270) {
    document.getElementById("next-button").style.display = 'none';
  }; if (left !== 0 ) {
    document.getElementById("prev-button").style.display = '';
  };

  left = left - 137;

  let item = document.getElementsByClassName("middle-main-blue");
  item[0].style.left = left + "px";
};

function moveRight() {
  
  left = left + 137;

  if (left > 0) {
    document.getElementById("prev-button").style.display = 'none'
  }; if (left !== - 270) {  
    document.getElementById("next-button").style.display = '';
  };

  let item = document.getElementsByClassName("middle-main-blue");
  item[0].style.left = left + "px";
};

