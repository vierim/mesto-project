export default class Section {

  constructor({ items, renderer}, selector) {
    this._data = items; // массив данных, добавляемых на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных
    this._container = document.querySelector(selector); // селектор контейнера, куда добавляет элементы экземпляр класса
  }

  // метод для добавления элемента в DOM (элемент приходит как параметр функции)
  addItem(element) {
    this._container.append(element);
  }

  // метод для очистки всего контейнера (пока нужен только при инициализации)
  _clear() {
    this._container.innerHTML = '';
  }

  // метод для рендера всех элементов, полученных при инициализации экземпляра класса
  renderItems() {
    this._clear();

    this._data.forEach(item => {
      this._renderer(item);
    });
  }
}
