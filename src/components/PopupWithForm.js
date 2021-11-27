import { config } from "./config.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._form = this.popupElement.querySelector(config.popup.formSelector);
    this._submitButton = this._form.querySelector(config.form.buttonSelector);
    this._submitFormHandler = submitFormHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setButtonState = this._setButtonState.bind(this);
  }

  _setButtonState(isSending) {
    this._submitButton.disabled = isSending;
    this._submitButton.textContent = isSending ? "Сохранение..." : "Сохранить";
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(config.form.inputSelector);

    const body = {};

    for (let input of inputs) {
      body[input.name] = input.value;
    }

    return body;
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
    this._form.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
