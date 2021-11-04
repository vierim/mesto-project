const hasInvalidInput = inputList => {
  return !inputList.every(item => item.validity.valid);
}

const toggleButtonActivity = (inputList, buttonElement, validityConfig) => {

  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validityConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validityConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hideErrorText = (formElement, inputElement, validityConfig) => {

  const errorElement = formElement.querySelector(`#${inputElement.name}-${validityConfig.errorMsgPrefix}`);

  inputElement.classList.remove(validityConfig.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validityConfig.errorClass);
}

const showErrorText = (formElement, inputElement, validityConfig) => {

  const errorElement = formElement.querySelector(`#${inputElement.name}-${validityConfig.errorMsgPrefix}`);

  inputElement.classList.add(validityConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validityConfig.errorClass);
}

const checkInputValidity = (formElement, inputElement, validityConfig) => {

  if(!inputElement.validity.valid) {
    showErrorText(formElement, inputElement, validityConfig);
  } else {
    hideErrorText(formElement, inputElement, validityConfig);
  }
}

// Навешиваем обработчики события input на все поля ввода в форме, переданной в качестве параметра
const setFormEventListeners = (formElement, validityConfig) => {

  const inputList = Array.from(formElement.querySelectorAll(validityConfig.inputSelector));
  const buttonElement = formElement.querySelector(validityConfig.submitButtonSelector);

  inputList.forEach(item => {

    item.addEventListener('input', () => {

      checkInputValidity(formElement, item, validityConfig);
      toggleButtonActivity(inputList, buttonElement, validityConfig);
    });
  });

  toggleButtonActivity(inputList, buttonElement, validityConfig);
}

// Базовая функция активации валидации форм
export const enableValidation = (validityConfig) => {

  // Находим все формы в проекте
  const forms = Array.from(document.querySelectorAll(validityConfig.formSelector));

  // Активируем валидацию для каждой найденной формы
  forms.forEach(item => setFormEventListeners(item, validityConfig));
}
