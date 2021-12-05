export class FormValidator {
  constructor(selectors, form) {
    this._validityConfig = selectors;
    this._formElement = form;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validityConfig.inputSelector)
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const buttonElement = this._formElement.querySelector(
      this._validityConfig.submitButtonSelector
    );

    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity(item);
        this._toggleButtonActivity(buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorText(inputElement);
    } else {
      this._hideErrorText(inputElement);
    }
  }

  _toggleButtonActivity(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._validityConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validityConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every((item) => item.validity.valid);
  }

  _hideErrorText(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-${this._validityConfig.errorMsgPrefix}`
    );

    inputElement.classList.remove(this._validityConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validityConfig.errorClass);
  }

  _showErrorText(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-${this._validityConfig.errorMsgPrefix}`
    );

    inputElement.classList.add(this._validityConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validityConfig.errorClass);
  }
}
