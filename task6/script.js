"use strict";

const dateNow = new Date();

const toUpperFirst = (word) => {
  return word[0].toUpperCase() + word.slice(1);
} 

const getTimeOfDay = () => {
  const hour = dateNow.getHours();
  let timeOfDay;
  if (hour < 5 || hour > 22) {
    timeOfDay = "Доброй ночи";
  } else if (hour < 11) {
    timeOfDay = "Доброе утро";
  } else if (hour < 18) {
    timeOfDay = "Добрый день";
  } else {
    timeOfDay = "Добрый вечер";
  };
  return timeOfDay;
}

function getDaysUntilNewYear() {
  let timeStop = new Date(dateNow.getFullYear() + 1,0,1).getTime();
  let timeNow = dateNow.getTime();
  let timeRemaining = (timeStop - timeNow) / 1000;
  let day = Math.floor(timeRemaining / 60 / 60 / 24);
  return day;
}

const getDecline = (days) => {
  const decs = [[0,5,6,7,8,9],[1],[2,3,4]];
  const decWords = ["дней","день","дня"]
  let result;
  if (Math.floor(days / 10) == 1) {
    result = "дней";
  } else {
    for (let keyDec in decs) {
      if (decs[keyDec].includes(days % 10)) {
        result = decWords[keyDec];
        break;
      }
    }
  }
  return result;
}

const dayOfWeek = toUpperFirst(dateNow.toLocaleString("ru", {
  weekday: "long"
}));

const timeNow = dateNow.toLocaleString("ru", {
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
});

const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");
const body = document.querySelector("body");
body.style.cssText = `font-size: 20px; 
                      font-family: sans-serif; 
                      font-style: italic;`;

const daysUntilNewYear = getDaysUntilNewYear();
p1.textContent = getTimeOfDay();
p2.textContent = "Сегодня: " + dayOfWeek;
p3.textContent = "Текущее время: " + timeNow;
p4.textContent = `До нового года осталось 
                ${daysUntilNewYear} 
                ${getDecline(daysUntilNewYear)}`;

body.append(p1);
body.append(p2);
body.append(p3);
body.append(p4);


