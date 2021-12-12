import { config } from '../utils/config.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._form = this.popupElement.querySelector(config.popup.formSelector);
    this._submitButton = this._form.querySelector(config.form.buttonSelector);
    this._defualtSubmitButtonText = this._submitButton.textContent;
    this._submitFormHandler = submitFormHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setButtonState = this._setButtonState.bind(this);
    this._inputs = this._form.querySelectorAll(config.form.inputSelector);
  }

  _setButtonState(isSending) {
    this._submitButton.disabled = isSending;
    this._submitButton.textContent = isSending ? 'Загрузка...' : this._defualtSubmitButtonText;
  }

  _getInputValues() {
    const inputValues = {};

    for (let input of this._inputs) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const body = this._getInputValues();

    this._setButtonState(true);

    this._submitFormHandler(body)
      .then(() => this.close())
      .finally(() => {
        this._setButtonState(false);
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
