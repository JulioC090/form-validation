import InputHandle from "./inputHandle.js";
import FormHandle from "./formHandle.js";

const usernameInput = new InputHandle({
  inputId: "input-username",
  message: "<p>O nome deve ter apenas caracteres</p>",
  isRequired: true,
  validation: (text) => {
    if (text.trim() === "") return false;

    const nameRule = new RegExp("^[a-zA-Z]+$");
    if (!nameRule.test(text)) return false;

    return true;
  },
});

const emailInput = new InputHandle({
  inputId: "input-email",
  message: "<p>O email deve ser do tipo email@domain.com</p>",
  isRequired: true,
  validation: (text) => {
    if (text.trim() === "") return false;

    const emailRule = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
    if (!emailRule.test(text)) return false;
    return true;
  },
});

const passwordInput = new InputHandle({
  inputId: "input-password",
  message: "<p>A senha deve possuir mais de 8 caracteres</p>",
  isRequired: true,
  validation: (text) => {
    if (text.length < 8) return false;
    return true;
  },
});

const form = new FormHandle({
  formId: "sign-up",
  inputHandles: [usernameInput, emailInput, passwordInput],
  onSubmit: () => {
    alert("O formulário foi enviado");
  },
});
