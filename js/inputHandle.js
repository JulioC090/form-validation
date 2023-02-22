class InputHandle {
  constructor({
    inputId,
    status = "default",
    messageVisible = false,
    message = "",
    validate,
  }) {
    this.inputContainerElement = document.getElementById(inputId);

    this.messageElement = this.inputContainerElement.getElementsByClassName(
      "form__input__message"
    )[0];

    this.statusIconElement =
      this.inputContainerElement.getElementsByClassName("form__input__icon")[0];

    this.inputElement = this.inputContainerElement.querySelector("input");

    this.setStatus(status);
    this.messageVisible = messageVisible;

    this.defaultMessage = message;
    this.setMessage(message);

    this.inputElement.addEventListener("focusout", (event) => {
      if (validate(event.target.value)) {
        this.setStatus("valid");
      } else {
        this.setStatus("invalid");
        this.toggleMessage(3000);
      }
    });
  }

  setStatus(status) {
    if (status !== "default" && status !== "invalid" && status !== "valid") {
      throw new Error("Invalid status");
    }
    this.status = status;

    this.inputContainerElement.classList.remove("form__input--valid");
    this.inputContainerElement.classList.remove("form__input--invalid");
    this.statusIconElement.classList.remove("ph-check-circle");
    this.statusIconElement.classList.remove("ph-warning-circle");
    this.statusIconElement.classList.remove("ph-info");

    if (status === "default") {
      this.statusIconElement.classList.add("ph-info");
    }
    if (status === "valid") {
      this.inputContainerElement.classList.add("form__input--valid");
      this.statusIconElement.classList.add("ph-check-circle");
      return;
    }
    if (status === "invalid") {
      this.inputContainerElement.classList.add("form__input--invalid");
      this.statusIconElement.classList.add("ph-warning-circle");
      return;
    }
  }

  toggleMessage(time) {
    this.messageElement.classList.toggle("form__input__message--active");

    if (time) {
      setTimeout(() => {
        this.messageElement.classList.toggle("form__input__message--active");
      }, time);
    }
  }

  setMessage(message) {
    this.message = message;
    this.messageElement.innerHTML = message;
  }

  setMessageToDefault() {
    this.setMessage(this.defaultMessage);
  }
}

const usernameInput = new InputHandle({
  inputId: "input-username",
  message: "<p>O nome deve ter apenas caracteres</p>",
  validate: (text) => {
    if (text.trim() === "") return false;

    const nameRule = new RegExp("^[a-zA-Z]+$");
    if (!nameRule.test(text)) return false;

    return true;
  },
});

const emailInput = new InputHandle({
  inputId: "input-email",
  message: "<p>O email deve ser do tipo email@domain.com</p>",
  validate: (text) => {
    if (text.trim() === "") return false;

    const emailRule = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
    if (!emailRule.test(text)) return false;
    return true;
  },
});

const passwordInput = new InputHandle({
  inputId: "input-password",
  message: "<p>A senha deve possuir mais de 8 caracteres</p>",
  validate: (text) => {
    if (text.length < 8) return false;
    return true;
  },
});
