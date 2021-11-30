import { config } from "./config.js";

export const disableSubmitButton = (popupElement) => {
  const buttonElement = popupElement.querySelector(config.form.buttonSelector);

  buttonElement.classList.add(config.form.inactiveButtonClass);
  buttonElement.disabled = true;
};

export const setButtonState = (button, isSending) => {
  button.disabled = isSending;
  button.textContent = isSending ? "Сохранение..." : "Сохранить";
};
