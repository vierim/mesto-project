import { config } from './config.js';
import { userInfo } from '../pages/index.js';
import { elements } from './elements.js';
import { showImageModal } from './modal.js';
import { deleteCard, addLike, removeLike } from './api.js';
import { showError } from './utils.js';

import placeHolder from '../images/placeholder.jpg';

// Получаем разметку шаблона карточки
const cardNodeContent = elements.cardsTemplate.content;

const updateLikesCount = (selector, count) => {
  selector.textContent = count;
}

const deleteCardHandler = (evt) => {
  deleteCard(evt.target.previousElementSibling.id)
  .then(() => {
    evt.target.parentNode.remove();
  })
  .catch(err => showError(err));
}

const imageClickHandler = (evt) => {
  showImageModal(evt.target);
}

// Функция добавления событий на отдельно взятую карточку места
const setEventsToCard = (cardItem, owner = false) => {

  const cardImage = cardItem.querySelector(config.cards.imageSelector);
  const cardLikeButton = cardItem.querySelector(config.cards.likeButtonSelector);
  const cardLikesCount = cardItem.querySelector(config.cards.likesCountSelector);
  const cardRemoveButton = cardItem.querySelector(config.cards.deleteButtonSelector);

  // Клик по изображению
  cardImage.addEventListener('click', imageClickHandler);

  // Обработка ошибки загрузки изображения
  cardImage.addEventListener('error', () => {

    cardImage.src = placeHolder;
    cardImage.classList.add(config.cards.placeholderClass);
    cardImage.removeEventListener('click', imageClickHandler);
  });

  // Клик по иконке лайка
  cardLikeButton.addEventListener('click', function(evt) {
    if(!evt.target.classList.contains(config.cards.hasLikedClass)) {
      addLike(cardImage.id)
        .then((res) => {
          evt.target.classList.add(config.cards.hasLikedClass);
          updateLikesCount(cardLikesCount, res.likes.length);
        })
        .catch(err => showError(err));
    } else {
      removeLike(cardImage.id)
        .then((res) => {
          evt.target.classList.remove(config.cards.hasLikedClass);
          updateLikesCount(cardLikesCount, res.likes.length);
        })
        .catch(err => showError(err));
    }
  });

  // Иконка удаления карточки
  // Проверка на принадлежность карточки текущему пользователю
  if(owner) {
    // Показываем иконку удаления
    cardRemoveButton.classList.add(config.cards.deleteButtonVisibleClass);

    // Навешиваем событие для удаления карточки
    cardRemoveButton.addEventListener('click', deleteCardHandler);
  }
}

const hasMyLike = (usersList) => {
  let res = false;

  usersList.forEach(item => {
    if(item._id === userInfo._id) {
      res = true;
    }
  });

  return res;
}

// Функция возвращает готовую разметку новой карточки
export const createCard = (cartItem) => {

  // Клонируем ноду с разметкой карточки
  const clonedCard = cardNodeContent.querySelector(config.cards.itemSelector).cloneNode(true);

  //заполняем html-теги новой карточки
  clonedCard.querySelector(config.cards.imageSelector).src = cartItem.link;
  clonedCard.querySelector(config.cards.imageSelector).alt = cartItem.name;
  clonedCard.querySelector(config.cards.imageSelector).id = cartItem.id;

  clonedCard.querySelector(config.cards.nameSelector).textContent = cartItem.name;

  if(hasMyLike(cartItem.likes)) {
    clonedCard.querySelector(config.cards.likeButtonSelector).classList.add(config.cards.hasLikedClass);
  }
  clonedCard.querySelector(config.cards.likesCountSelector).textContent = cartItem.likes.length;

  // Навешиваем на карточку обработчики событий
  setEventsToCard(clonedCard, (cartItem.owner === userInfo._id));

  // Возвращаем разметку созданной карточки
  return clonedCard;
}

// Функция добавления карточки в коллекцию на странице
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}
