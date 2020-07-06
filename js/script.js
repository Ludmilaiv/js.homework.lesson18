window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  // Timer
  const countTimer = (deadline) => {
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
    
  };

  countTimer("20 july 2020");

  //меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");
    const btnClose = document.querySelector(".close-btn");
    const menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    }

    btnMenu.addEventListener("click", handlerMenu);
    btnClose.addEventListener("click", handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener("click", handlerMenu));

  };

  toggleMenu();

  //popup

  const togglePopUp = () => {
    const popup = document.querySelector(".popup");
    const popupContent = popup.querySelector(".popup-content");
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popupClose = document.querySelector(".popup-close");

    const animateShow = () => {
      if (screen.width >= 768) {
        let top = parseFloat(popupContent.style.top);
        top += 20;
        if (top < popup.offsetHeight / 10) {
          popupContent.style.top = top + "px";
          if (+popup.style.opacity < 1) {
            popup.style.opacity = +popup.style.opacity + 0.04;
          }
          requestAnimationFrame(animateShow);
        } else {
          popup.style.opacity = 1;
        }
      } else {
        popupContent.style.top = popup.offsetHeight / 10 + "px"
        popup.style.opacity = 1;
      }
      
    }

    const animateHide = () => {
      if (screen.width >= 768) {
        let top = parseFloat(popupContent.style.top);
        top -= 20;
        if (top > -popupContent.offsetHeight) {
          popupContent.style.top = top + "px";
          if (+popup.style.opacity > 0) {
            popup.style.opacity = +popup.style.opacity - 0.04;
          }
          requestAnimationFrame(animateHide);
        } else {
          popup.style.display = "none";
        }
      } else {
        popup.style.display = "none";
      }
      
    }

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.opacity = "0";
        popup.style.display = "block";
        popupContent.style.top = `-${popupContent.offsetHeight}px`;
        animateShow();
      });
    });

    popupClose.addEventListener("click", () => {
      animateHide();
    });

  }

  togglePopUp();


});
