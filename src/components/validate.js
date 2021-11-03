import { config } from './config.js';

const hasInvalidInput = inputList => {
  return inputList.every(item => item.validity.valid);
}

const toggleButtonActivity = (inputList, buttonElement) => {
  if(!hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.form.disabledButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.form.disabledButtonClass);
    buttonElement.disabled = false;
  }
}

const hideErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-${config.form.errorMsgPrefix}`);

  inputElement.classList.remove(config.form.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.form.errorMsgVisibleClass);
}

const showErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-${config.form.errorMsgPrefix}`);

  inputElement.classList.add(config.form.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.form.errorMsgVisibleClass);
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showErrorText(formElement, inputElement);
  } else {
    hideErrorText(formElement, inputElement);
  }
}

const setFormEventListeners = formElement => {

  const inputList = Array.from(formElement.querySelectorAll(config.form.inputSelector));
  const buttonElement = formElement.querySelector(config.form.buttonSelector);

  inputList.forEach(item => {
    item.addEventListener('input', () => {
      checkInputValidity(formElement, item);

      toggleButtonActivity(inputList, buttonElement);
    });
  });

  toggleButtonActivity(inputList, buttonElement);
}

export const enableValidation = popupElement => {

  const formElement = popupElement.querySelector(config.popup.formSelector);
  setFormEventListeners(formElement);
}
