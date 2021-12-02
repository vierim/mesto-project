import { config } from "./config.js";
import { showError } from "./utils.js";
import placeHolder from "../images/placeholder.jpg";
import { api } from "../pages/index.js";
import { elements } from "./elements.js";
export class Card {
  constructor(
    { data, handleCardClick, handleDeleteButtonClicked, userId },
    selector
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClicked = handleDeleteButtonClicked;
    this._selector = selector;
    this._userId = userId;

    this._handleImageClick = this._handleImageClick.bind(this);
    this._handleErrorImageLoad = this._handleErrorImageLoad.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content.querySelector(config.cards.itemSelector)
      .cloneNode(true);
  }

  _updateLikesCount(count) {
    this._cardLikesCount = this._cardElement.querySelector(
      config.cards.likesCountSelector
    );

    this._cardLikesCount.textContent = count > 0 ? count : '';
  }

  _handleLikeClick(evt) {
    if (!evt.target.classList.contains(config.cards.hasLikedClass)) {
      api
        .addLike(this._data._id)
        .then((res) => {
          evt.target.classList.add(config.cards.hasLikedClass);
          this._updateLikesCount(res.likes.length);
        })
        .catch((err) => showError(err));
    } else {
      api
        .removeLike(this._data._id)
        .then((res) => {
          evt.target.classList.remove(config.cards.hasLikedClass);
          this._updateLikesCount(res.likes.length);
        })
        .catch((err) => showError(err));
    }
  }

  _handleImageClick() {
    this._handleCardClick(this._data);
  }

  _handleErrorImageLoad() {
    this._cardImage.src = placeHolder;
    this._cardImage.classList.add(config.cards.placeholderClass);
    this._cardImage.removeEventListener("click", this._handleImageClick);
  }

  // Метод для добавления слушателей событий на карточку
  _setEventListeners() {
    this._cardImage = this._cardElement.querySelector(
      config.cards.imageSelector
    );
    this._cardLikeButton = this._cardElement.querySelector(
      config.cards.likeButtonSelector
    );

    this._deleteButton = this._cardElement.querySelector(
      config.cards.deleteButtonSelector
    );

    this._cardImage.addEventListener("click", this._handleImageClick);
    this._cardImage.addEventListener("error", this._handleErrorImageLoad);

    // Клик по иконке лайка
    this._cardLikeButton.addEventListener("click", this._handleLikeClick);

    if (this._data.owner._id === this._userId) {
      this._deleteButton.classList.add(config.cards.deleteButtonVisibleClass);
      this._deleteButton.addEventListener(
        "click",
        this._handleDeleteButtonClicked
      );
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
    //заполняем html-теги новой карточки
    this._cardElement.querySelector(config.cards.imageSelector).src =
      this._data.link;
    this._cardElement.querySelector(config.cards.imageSelector).alt =
      this._data.name;
    this._cardElement.id = this._data._id;
    this._cardElement.querySelector(config.cards.nameSelector).textContent =
      this._data.name;

    // Отмечаем карточку лайком, если id текущего пользователя есть в массиве всех лайков
    if (this._hasMyLike()) {
      this._cardElement
        .querySelector(config.cards.likeButtonSelector)
        .classList.add(config.cards.hasLikedClass);
    }

    if(this._data.likes.length > 0) {
      this._cardElement.querySelector(
        config.cards.likesCountSelector
      ).textContent = this._data.likes.length;
    }

  }

  createCard() {
    this._cardElement = this._getElement();

    this._generate();
    this._setEventListeners();

    return this._cardElement;
  }
}
