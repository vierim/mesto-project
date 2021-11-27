import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector, card) {
    super(selector);
    this._image = this.popupElement.querySelector(imageSelector);
    this._text = this.popupElement.querySelector(figcaptionSelector);

    this._card = card;
  }

  open() {
    super.open();

    this._showImageModal();
  }

  _showImageModal() {
    this._image.src = this._card.link;
    this._image.alt = this._card.name;
    this._text.textContent = this._card.name;
  }
}
