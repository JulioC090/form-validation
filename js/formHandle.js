class FormHandle {
  constructor({ formId, inputHandles = [], onSubmit = () => {} }) {
    this.formElement = document.getElementById(formId);
    this.buttonElement = this.formElement.querySelector(".form__button");
    this.inputs = inputHandles;

    this.buttonElement.disabled = true;

    this.formElement.addEventListener("input", () => {
      let isValid = true;
      this.inputs.forEach((input) => {
        if (!input.hasValidValue()) isValid = false;
      });

      if (!isValid) {
        this.buttonElement.disabled = true;
        return;
      }

      this.buttonElement.disabled = false;
    });

    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit(event);
    });
  }
}

export default FormHandle;
