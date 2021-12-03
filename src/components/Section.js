export class Section {
  constructor({ items, renderer }, selector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._clear();

    this._data.forEach((item) => {
      this._renderer(item);
    });
  }
}
