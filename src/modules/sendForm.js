const sendForm = () => {

  class Validator {
    constructor({selector, pattern = {}, method}) {
      this.form = document.querySelector(selector);
      this.pattern = pattern;
      this.method = method;
      this.elementsForm = [...this.form.elements].filter(item => {
        return item.tagName.toLowerCase() !== "button" &&
        item.type !== "button";
      });
      this.error = new Set();
    }

    init() {
      this.applyStyle();
      this.setPattern();
      this.elementsForm.forEach(elem => elem.addEventListener("change", this.checkIt.bind(this)));
      //Это для отправки по submit без XML запроса
      if (!this.XMLRequest) {
        this.form.addEventListener("submit", e => {
        if (this.isValidation()) {
          e.preventDefault();
        }
      });
      } 
    }

    isValidation() {
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size) {
        return false;
      } else {
        return true;
      }
    }

    isValid(elem) {
      const validatorMethod = {
        noEmpty(elem) {
          if (elem.value.trim() === "") {
            return false;
          }
          return true;
        },
        pattern(elem, pattern) {
          return pattern.test(elem.value);
        }
      };

      if (this.method) {
        const method = this.method[elem.id];
        if (method) {
          return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
        }
      } else {
        console.warn("Необходимо передать id полей ввода и методы проверки этих полей")
      }
      
      return true;
    };

    checkIt(event) {
      const target = event.target;

      if (this.isValid(target)) {
        this.showSuccess(target);
        this.error.delete(target);
      } else {
        this.showError(target);
        this.error.add(target);
      }
    }

    showError(elem) {
      elem.classList.remove("success")
      elem.classList.add("error");
      if (elem.nextElementSibling) {
        if (elem.nextElementSibling.classList.contains("validator-error")) {
          return;
        }
      }
      const errorDiv = document.createElement("div");
      errorDiv.textContent = "Ошибка в этом поле";
      errorDiv.classList.add("validator-error");
      elem.insertAdjacentElement("afterend", errorDiv);
    }

    showSuccess(elem) {
      elem.classList.remove("error")
      elem.classList.add("success");
      if (elem.nextElementSibling) {
        if (elem.nextElementSibling.classList.contains("validator-error")) {
        elem.nextElementSibling.remove();
      }
      }
    }

    applyStyle() {
      const style = document.createElement("style");
      style.textContent = `
        input.success {
          border: 2px solid green !important
        }
        input.error {
          border: 2px solid red !important
        }
        .validator-error {
          font-size: 12px;
          font-family: sans-serif;
          color: red;
        }
      `;
      document.head.appendChild(style);
    }

    setPattern() {

      if (!this.pattern.phone) {
        this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
      }
      if (!this.pattern.email) {
        this.pattern.email = /^\w+@\w+\.\w{2,}$/;
      }
    }
  }

  let validators = {};
  const forms = document.querySelectorAll("form");
  forms.forEach((form, i) => {
    const valid = new Validator ({	
      selector: "#form"+ (i + 1),
      pattern: {
        text: /^[а-яА-ЯёЁ\s]+$/
      },
      method: {
      },
      XMLRequest: true
    });
    valid.method[`form${i + 1}-phone`] = [
      ["noEmpty"],
      ["pattern", "phone"]
    ];
    valid.method[`form${i + 1}-email`] = [
      ["noEmpty"],
      ["pattern", "email"]
    ];
    valid.method[`form${i + 1}-name`] = [
      ["noEmpty"],
      ["pattern", "text"]
    ];
    valid.method[`form${i + 1}-message`] = [
      ["noEmpty"],
      ["pattern", "text"]
    ]
    valid.init();
    validators[`form${i + 1}`] = valid;
  });

  const errorMesage = "Что-то пошло не так...";
  const loadImage = "images/loading.gif";
  const successMessage = "Спасибо! Мы скоро с вами свяжемся";

  const statusMessage = document.createElement("div");
  statusMessage.classList.add("message");
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
        const clearForm = () => {
          form.reset();
          const elements = form.querySelectorAll("input");
          elements.forEach(elem => {
            elem.classList.remove("success");
          })
          setTimeout(() => {statusMessage.remove()}, 5000);
        } 
        postData(body)
          .then(
            (response) => {
              if (response.status !== 200) {
                throw new Error("status network not 200");
              }
              statusMessage.textContent = successMessage;
              clearForm();
            })
          .catch(error => {
            statusMessage.textContent = errorMesage;
            console.log(error);
            clearForm();
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
};

export default sendForm;