// "Локальный" объект для хранения полученнего для валидации конфига
let elements = {};

const hasInvalidInput = inputList => {
  return inputList.every(item => item.validity.valid);
}

const toggleButtonActivity = (inputList, buttonElement) => {
  if(!hasInvalidInput(inputList)) {
    buttonElement.classList.add(elements.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(elements.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hideErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-${elements.errorMsgPrefix}`);

  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(elements.errorClass);
}

const showErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-${elements.errorMsgPrefix}`);

  inputElement.classList.add(elements.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(elements.errorClass);
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showErrorText(formElement, inputElement);
  } else {
    hideErrorText(formElement, inputElement);
  }
}

const setFormEventListeners = formElement => {

  const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
  const buttonElement = formElement.querySelector(elements.submitButtonSelector);

  inputList.forEach(item => {
    item.addEventListener('input', () => {
      checkInputValidity(formElement, item);
      toggleButtonActivity(inputList, buttonElement);
    });
  });

  toggleButtonActivity(inputList, buttonElement);
}

const composeLocalObject = validityConfig => {
  elements = validityConfig;
}

// Базовая функция активации валидации форм
export const enableValidation = validityConfig => {
  // Копируем ссылку на объект в "локальную" для данной логики переменную, чтобы не передавать объект параметром при вызове каждой функции
  composeLocalObject(validityConfig);

  // Находим все формы в проекте (селектор в переданном объекте)
  const forms = Array.from(document.querySelectorAll(elements.formSelector));

  // Активируем валидацию для каждой найденной формы
  forms.forEach(item => setFormEventListeners(item));
}
