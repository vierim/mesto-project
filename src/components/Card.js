import { config } from '../utils/config.js';
import placeHolder from '../images/placeholder.jpg';

export class Card {
  constructor(
    { data, handleCardClick, handleDeleteButtonClicked, handleLikeButtonClick, userId },
    selector
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClicked = handleDeleteButtonClicked;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._selector = selector;
    this._userId = userId;

    this._handleImageClick = this._handleImageClick.bind(this);
    this._handleErrorImageLoad = this._handleErrorImageLoad.bind(this);
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content.querySelector(config.cards.itemSelector)
      .cloneNode(true);
  }

  _handleImageClick() {
    this._handleCardClick(this._data);
  }

  _handleErrorImageLoad() {
    this._cardImage.src = placeHolder;
    this._cardImage.classList.add(config.cards.placeholderClass);
    this._cardImage.removeEventListener('click', this._handleImageClick);
  }

  // Метод для добавления слушателей событий на карточку
  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleImageClick);
    this._cardImage.addEventListener('error', this._handleErrorImageLoad);

    // Клик по иконке лайка
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._data._id, this._cardLikeButton, this._cardLikesCount);
    });

    if (this._data.owner._id === this._userId) {
      this._deleteButton.classList.add(config.cards.deleteButtonVisibleClass);

      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClicked(this._data._id);
      });
    }
  }

  _hasMyLike() {
    let res = false;

    this._data.likes.forEach((item) => {
      if (item._id === this._userId) {
        res = true;
      }
    });

    return res;
  }

  _generate() {
    this._cardImage = this._cardElement.querySelector(config.cards.imageSelector);
    this._cardLikeButton = this._cardElement.querySelector(config.cards.likeButtonSelector);
    this._cardLikesCount = this._cardElement.querySelector(config.cards.likesCountSelector);
    this._deleteButton = this._cardElement.querySelector(config.cards.deleteButtonSelector);

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    this._cardElement.id = this._data._id;
    this._cardElement.querySelector(config.cards.nameSelector).textContent = this._data.name;

    if (this._hasMyLike()) {
      this._cardLikeButton.classList.add(config.cards.hasLikedClass);
    }

    if (this._data.likes.length > 0) {
      this._cardLikesCount.textContent = this._data.likes.length;
    }
  }

  createCard() {
    this._cardElement = this._getElement();

    this._generate();
    this._setEventListeners();

    return this._cardElement;
  }
}
