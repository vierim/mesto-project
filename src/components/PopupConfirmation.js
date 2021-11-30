import { config } from "./config.js";
import { Popup } from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._submitButton = this.popupElement.querySelector(
      config.popup.buttonSelector
    );
    this._submitFormHandler = submitFormHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const id = this.popupElement.querySelector(
      config.popup.functionSelector.confirmation
    ).dataset.removeCardId;

    this._submitFormHandler(body)
      .then(() => this.close())
      .finally(() => {
        this._setButtonState(false);
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._submitButton.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
  }
}
