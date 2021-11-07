import { config } from './config.js';
import { cardsList, userInfo } from '../components/data.js';
import { elements } from './elements.js';
import { showImageModal } from './modal.js';
import { deleteCard } from './api.js';

import placeHolder from '../images/placeholder.jpg';

// Получаем разметку шаблона карточки
const cardNodeContent = elements.cardsTemplate.content;

const imageClickHandler = (evt) => {
  showImageModal(evt.target);
}

// Функция добавления событий на отдельно взятую карточку места
const setEventsToCard = (cardItem, owner = false) => {

  const cardImage = cardItem.querySelector(config.cards.imageSelector);
  const cardLikeButton = cardItem.querySelector(config.cards.likeButtonSelector);
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
    evt.target.classList.toggle(config.cards.hasLikedClass);
  });

  // Клик по иконке удаления карточки
  if(owner) {
    cardRemoveButton.classList.add(config.cards.deleteButtonVisibleClass);

    cardRemoveButton.addEventListener('click', function(evt) {
      deleteCard(evt.target.previousElementSibling.id)
        .then(() => {
          evt.target.parentNode.remove();
        });
    });
  }
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

  // Навешиваем на карточку обработчики событий
  setEventsToCard(clonedCard, (cartItem.owner === userInfo._id));

  // Возвращаем разметку созданной карточки
  return clonedCard;
}

// Функция добавления карточки в коллекцию на странице
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}
