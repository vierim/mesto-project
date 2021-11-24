import { config } from './config.js';
import { userInfo } from '../pages/index.js';
import { deleteCard, addLike, removeLike } from './api.js';
import { showError } from './utils.js';

import placeHolder from '../images/placeholder.jpg';

export default class Card {

  constructor({ data, handleCardClick }, selector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._selector = selector;

    this._handleErrorImageLoad = this._handleErrorImageLoad.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
  }

  // метод получает html разметку шаблона карточки из документа (все селекторы берет в конструкторе класса)
  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(config.cards.itemSelector)
      .cloneNode(true);
  }

  _updateLikesCount(count) {
    this._cardLikesCount = this._cardElement.querySelector(config.cards.likesCountSelector);
    this._cardLikesCount.textContent = count;
  }

  _handleErrorImageLoad() {

    this._cardImage.src = placeHolder;
    this._cardImage.classList.add(config.cards.placeholderClass);
    //cardImage.removeEventListener('click', imageClickHandler);
  }

  _handleLikeClick(evt) {

    if(!evt.target.classList.contains(config.cards.hasLikedClass)) {
      addLike(this._data._id)
        .then((res) => {
          evt.target.classList.add(config.cards.hasLikedClass);
          this._updateLikesCount(res.likes.length);
        })
        .catch(err => showError(err));
    } else {
      removeLike(this._data._id)
        .then((res) => {
          evt.target.classList.remove(config.cards.hasLikedClass);
          this._updateLikesCount(res.likes.length);
        })
        .catch(err => showError(err));
    }
  }

  _handleDeleteCard() {
    deleteCard(this._data._id)
    .then(() => {
      // Тут нужен какой-то рендер!
    })
    .catch(err => showError(err));
  }

  // Метод для добавления слушателей событий на карточку
  _setEventListeners() {

    this._cardImage = this._cardElement.querySelector(config.cards.imageSelector);
    this._cardLikeButton = this._cardElement.querySelector(config.cards.likeButtonSelector);

    this._cardRemoveButton = this._cardElement.querySelector(config.cards.deleteButtonSelector);

    // Клик по изображению (url картинки уходит в callback функцию, так как используется другой класс)
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage);
    });

    // Обработка ошибки загрузки изображения
    this._cardImage.addEventListener('error', this._handleErrorImageLoad);

    // Клик по иконке лайка
    this._cardLikeButton.addEventListener('click', this._handleLikeClick);

    // Иконка удаления карточки
    // Проверка на принадлежность карточки текущему пользователю
    if(this._data.owner._id === userInfo._id) {
      // Показываем иконку удаления
      this._cardRemoveButton.classList.add(config.cards.deleteButtonVisibleClass);

      // Навешиваем событие для удаления карточки
      this._cardRemoveButton.addEventListener('click', this._handleDeleteCard);
    }
  }

  _hasMyLike() {
    let res = false;

    this._data.likes.forEach(item => {
      if(item._id === userInfo._id) {
        res = true;
      }
    });

    return res;
  }

  _generate() {
    //заполняем html-теги новой карточки
    this._cardElement.querySelector(config.cards.imageSelector).src = this._data.link;
    this._cardElement.querySelector(config.cards.imageSelector).alt = this._data.name;
    this._cardElement.querySelector(config.cards.imageSelector).id = this._data.id;
    this._cardElement.querySelector(config.cards.nameSelector).textContent = this._data.name;

    // Отмечаем карточку лайком, если id текущего пользователя есть в массиве всех лайков
    if(this._hasMyLike()) {
      this._cardElement.querySelector(config.cards.likeButtonSelector).classList.add(config.cards.hasLikedClass);
    }

    this._cardElement.querySelector(config.cards.likesCountSelector).textContent = this._data.likes.length;
  }

  // Публичный метод, который возвращает готовую карточку со всеми слушателями (ее уже можно отправлять на рендер в DOM)
  createCard() {
    // Клонируем ноду с разметкой карточки
    this._cardElement = this._getElement();

    // Добавляем в склонированный шаблон карточки данные, полученные при создании экземпляра класса
    this._generate();

    // Навешиваем на карточку обработчики событий
    this._setEventListeners();

    // Возвращаем разметку созданной карточки
    return this._cardElement;
  }
}
