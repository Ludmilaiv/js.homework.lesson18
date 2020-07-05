window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours");
    let timerMinutes = document.querySelector("#timer-minutes");
    let timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60)
      let hours = Math.floor(timeRemaining / 60 / 60) % 24;
      let day = Math.floor(timeRemaining / 60 / 60 / 24);
      return {timeRemaining, hours, minutes, seconds};
    }

    function makeTwoDig(number) {
      let num = number + "";
      if (num.length < 2) {
        num = "0" + num;
      }
      return num;
    }
    
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHours.textContent = makeTwoDig(timer.hours);
        timerMinutes.textContent = makeTwoDig(timer.minutes);
        timerSeconds.textContent = makeTwoDig(timer.seconds);
      } else {
        clearInterval(updateClock);
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }

    }
    updateClock();
    setInterval(updateClock, 1000);
    
  }

  countTimer("6 july 2020")

});
