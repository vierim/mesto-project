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

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, about) => {
  inputs.inputProfileName.value = name;
  inputs.inputProfileAbout.value = about;
};
