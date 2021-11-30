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

export const setModalImageParam = (src, figcaption) => {
  elements.modalImageElement.src = src;
  elements.modalTextElement.textContent = figcaption;
};
