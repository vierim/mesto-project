import { Popup } from "./Popup.js";
import { config } from "./config.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this.popupElement.querySelector(config.popup.imageSelector);
    this._text = this.popupElement.querySelector(
      config.popup.figcaptionSelector
    );
  }

  open(item) {
    super.open();

    this._image.src = item.link;
    this._image.alt = item.name;
    this._text.textContent = item.name;
  }
}
