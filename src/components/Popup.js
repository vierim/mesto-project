import { config } from '../utils/config.js';

export class Popup {
  constructor(selector) {
    this.popupElement = document.querySelector(selector);
    this._clickPopupHandler = this._clickPopupHandler.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupElement.classList.add(config.popup.openedClass);

    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove(config.popup.openedClass);

    this.removeEventListeners();
  }

  _clickPopupHandler(evt) {
    const isCloseButtonClicked = evt.target.classList.contains(config.popup.closePopupBtnClass);
    const isOverlayClicked = evt.target.classList.contains(config.popup.popupClass);

    if (isOverlayClicked || isCloseButtonClicked) {
      this.close(evt.currentTarget);
    }
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener('click', this._clickPopupHandler);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this.popupElement.removeEventListener('click', this._clickPopupHandler);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
