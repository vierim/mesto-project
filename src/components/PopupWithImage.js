import Popup from "./Popup.js";
import { elements } from "./elements.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open() {
    super.open();
  }

  close() {
    super.close();

    elements.modalImageElement.src = '';
    elements.modalTextElement.textContent = '';
  }
}
