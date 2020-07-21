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
        clearPopupForm(popup);
      }
    } else {
      popup.style.display = "none";
      clearPopupForm(popup);
    }
  }

  const clearPopupForm = (pop) => {
    const form = pop.querySelector("form");
    const validatorErrors = pop.querySelectorAll(".validator-error");
    const statusMessage = pop.querySelector(".message");
    const elements = form.querySelectorAll("input");
    form.reset();
    elements.forEach(elem => {
      elem.classList.remove("success");
      elem.classList.remove("error");
    });
    if (statusMessage) {
      statusMessage.remove();
    };
    validatorErrors.forEach(elem => elem.remove());
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
  });
};

export default togglePopUp;

