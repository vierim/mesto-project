export class FormValidator {
  constructor (selectors, form) {
    this._validityConfig = selectors;
    this._formElement = form;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {

    const inputList = Array.from(this._formElement.querySelectorAll(this._validityConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validityConfig.submitButtonSelector);

    inputList.forEach(item => {
      item.addEventListener('input', () => {
        this._checkInputValidity(item);
        this._toggleButtonActivity(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {

    if(!inputElement.validity.valid) {
      this._showErrorText(inputElement);
    } else {
      this._hideErrorText(inputElement);
    }
  }

  _toggleButtonActivity(inputList, buttonElement) {

    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validityConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validityConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every(item => item.validity.valid);
  }

  _hideErrorText(inputElement) {

    const errorElement = this._formElement.querySelector(`#${inputElement.name}-${this._validityConfig.errorMsgPrefix}`);

    inputElement.classList.remove(this._validityConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validityConfig.errorClass);
  }

  _showErrorText(inputElement) {

    const errorElement = this._formElement.querySelector(`#${inputElement.name}-${this._validityConfig.errorMsgPrefix}`);

    inputElement.classList.add(this._validityConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validityConfig.errorClass);
  }
}
