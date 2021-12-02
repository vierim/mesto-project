import { config } from "./config.js";
import { elements, inputs } from "./elements.js";

export const showPreloader = () => {
  elements.preloaderElement.classList.add("preloader_active");
};

export const hidePreloader = () => {
  elements.preloaderElement.classList.remove("preloader_active");
};

export const showError = (err) => {
  console.error(`Возникли проблемы при работе с сервером: ${err}`);
};

export const completeFormInputs = (name, about) => {
  inputs.inputProfileName.value = name;
  inputs.inputProfileAbout.value = about;
};

export const disableSubmitButton = (popupElement) => {
  const buttonElement = popupElement.querySelector(config.form.buttonSelector);

  buttonElement.classList.add(config.form.inactiveButtonClass);
  buttonElement.disabled = true;
};
