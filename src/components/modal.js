import { config } from "./config.js";
import { elements } from "./elements.js";

import { Popup } from "../components/Popup.js";

const popup = new Popup(config.popup.selector);

export const disableSubmitButton = (popupElement) => {
  const buttonElement = popupElement.querySelector(config.form.buttonSelector);

  buttonElement.classList.add(config.form.inactiveButtonClass);
  buttonElement.disabled = true;
};

export const setButtonState = (button, isSending) => {
  button.disabled = isSending;
  button.textContent = isSending ? "Сохранение..." : "Сохранить";
};

export const showImageModal = (img) => {
  elements.modalImageElement.src = img.src;
  elements.modalImageElement.alt = img.alt;
  elements.modalTextElement.textContent = img.alt;

  popup.open(elements.modalShowPhoto);
};
