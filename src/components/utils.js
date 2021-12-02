import { config } from "./config.js";
import { elements, inputs } from "./elements.js";

export const showPreloader = () => {
  elements.preloaderElement.classList.add("preloader_active");
};

export const hidePreloader = () => {
  elements.preloaderElement.classList.remove("preloader_active");
};

export const showError = (err, container) => {

  if (!err.json) {
    const errorElement = Array.from(container.querySelectorAll(config.form.errorMsgSelector));

    errorElement[errorElement.length-1].textContent = 'Что-то пошло не так... :( Попробуйте еще раз.';
    errorElement[errorElement.length-1].classList.add(config.form.errorMsgVisibleClass);
  } else {
    err.json().then((err) => {
      console.error(err.message);
    });
  }
};

export const completeFormInputs = (name, about) => {
  inputs.inputProfileName.value = name;
  inputs.inputProfileAbout.value = about;
};
