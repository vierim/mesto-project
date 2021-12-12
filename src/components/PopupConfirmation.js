import { config } from '../utils/config.js';
import { Popup } from './Popup.js';

export class PopupConfirmation extends Popup {
  constructor(selector, submitConfirmHandler) {
    super(selector);
    this._cardId = '';
    this._submitButton = this.popupElement.querySelector(config.popup.buttonSelector);
    this._submitConfirmHandler = submitConfirmHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open(cardId) {
    super.open();

    this._cardId = cardId;
  }

  _handleSubmit() {
    this._submitConfirmHandler(this._cardId).then(() => this.close());
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._submitButton.removeEventListener('click', this._handleSubmit);
  }
}
