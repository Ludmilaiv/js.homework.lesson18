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

  countTimer("30 july 2020");

  //меню
  const toggleMenu = () => {
    const menu = document.querySelector("menu");
    const menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    }

    document.addEventListener("click", (event) => {
      let target = event.target;
      menuItems.forEach(elem => {
        if (target.parentElement == elem || target.classList.contains("close-btn")) {
          handlerMenu();
          return;
        }
      });
      target = target.closest(".menu");
      if (target) {
        handlerMenu();
      } else if (menu.classList.contains("active-menu")){
        target = event.target;
        target = target.closest("menu");
        if (!target) {
          handlerMenu();
        }
      }
      
    });

   // btnMenu.addEventListener("click", handlerMenu);
  };

  toggleMenu();

  //popup

  const togglePopUp = () => {
    const popup = document.querySelector(".popup");
    const popupContent = popup.querySelector(".popup-content");
    const popupBtn = document.querySelectorAll(".popup-btn");

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

    popup.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        animateHide();
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          animateHide();
        }
      }

      
    })

  }

  togglePopUp();

  //плавная прокрутка

  const scrolling = () => {
    const menuItems = document.querySelectorAll("menu>ul>li>a");
    const downBtn = document.querySelector("main>a[href=\"#service-block\"]");

    const smoothScroll = (section, speed) => {
      if (document.documentElement.scrollTop < section.offsetTop) {
        scrollBy(0,speed);
        requestAnimationFrame(() => smoothScroll(section, speed));
      }
    }

    menuItems.forEach((elem, key) => {
      elem.addEventListener("click", event => {
        event.preventDefault();
        smoothScroll(document.querySelector(elem.getAttribute("href")), (key + 1) * 20);
      });
    });

    downBtn.addEventListener("click", event => {
      event.preventDefault();
      smoothScroll(document.querySelector(downBtn.getAttribute("href")), 20);
    });
    
  }

  scrolling();

  //табы

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tab = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
         tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });

      }
      
    });

  }

  tabs();

  //слайдер

  let interval;

  
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item");
    const dots = document.querySelector(".portfolio-dots");
    const slider = document.querySelector(".portfolio-content");
    const dot = [];

    const addDots = () => {
      for (let i = 0; i < slide.length; i++){
        const d = document.createElement("li");
        d.classList.add("dot");
        dots.append(d);
        dot.push(d);
      }
    };

    addDots();

    let currentSlide = 0;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    }

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    }

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide,time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", event => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
      
    });

    slider.addEventListener("mouseover", event => {
      if (event.target.matches(".portfolio-btn") || 
      event.target.matches(".dot")) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", event => {
      if (event.target.matches(".portfolio-btn") || 
      event.target.matches(".dot")) {
        startSlide();
      }
    });

    startSlide(1500);
 
  };

  slider();

  //наша команда

  const ourCommand = () => {
    const command = document.getElementById("command");
  
    command.addEventListener("mouseover", (event) => {
      const target = event.target;
      const oldImage = target.getAttribute("src");
      if(target.classList.contains("command__photo")) {
        target.setAttribute("src", target.dataset.img);
        target.addEventListener("mouseout", function  func() {
          target.setAttribute("src", oldImage);
          target.removeEventListener("mouseout", func);
        });
      }
    });
  }
  ourCommand();

  //калькулятор
  
  const calculatVerification = () => {
    const calc = document.getElementById("calc");
    
    calc.addEventListener("input", (event) => {
      const target = event.target;
      if (target.matches("input.calc-item")) {
        const value = target.value
        target.value = value.replace(/\D/,"");
      }
    })

  }
  calculatVerification();

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block");
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcDay = document.querySelector(".calc-day");
    const calcCount = document.querySelector(".calc-count");
    const totalValue = document.getElementById("total");

    const animTotal = (val) => {
      let showTotal = +totalValue.textContent;
      if (showTotal == 0) {
        totalValue.textContent = val;
      } else if (showTotal < val) {
        setTimeout(() => {
          showTotal++;
          totalValue.textContent = showTotal;
          animTotal(val);
        }, 1); 
      } else if (showTotal > val) {
        setTimeout(() => {
          showTotal--;
          totalValue.textContent = showTotal;
          animTotal(val);
        }, 1); 
      } 
    }

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const sqareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5
      }

      if (typeValue && sqareValue) {
         total = price * typeValue * sqareValue * countValue * dayValue;
       } 
       animTotal(total);
      //totalValue.textContent = total;
    };

    calcBlock.addEventListener("change",(event) => {
      const target = event.target;

      if (target.matches("select") || target.matches("input")) {
        countSum();
      }

    })
  };

  calc(100);

  //send-ajax-form

  const sendForm = () => {
    const errorMesage = "Что-то пошло не так...";
    const loadImage = "images/loading.gif";
    const successMessage = "Спасибо! Мы скоро с вами свяжемся";

    const forms = document.querySelectorAll("form");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; color: #fff";

    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validators[form.id].isValidation()) {
          form.appendChild(statusMessage);
          statusMessage.innerHTML = `<img src=${loadImage} width=50 alt="Загрузка">`;
          const formData = new FormData(form);
          let body = {};
          formData.forEach((val, key) => {
            body[key] = val;
          });
          postData(body)
            .then(
              (response) => {
                if (response.status !== 200) {
                  throw new Error("status network not 200");
                }
                statusMessage.textContent = successMessage;
                form.reset();
              })
            .catch(error => {
              statusMessage.textContent = errorMesage;
              console.log(error);
            } 
          );
        }
      });
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    }
    
    
    


  }

  sendForm();

});
