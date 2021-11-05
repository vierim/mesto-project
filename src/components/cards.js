import { config } from './config.js';
import { elements } from './elements.js';
import { showImageModal } from './modal.js';

import placeHolder from '../images/placeholder.jpg';

// Получаем разметку шаблона карточки
const cardNodeContent = elements.cardsTemplate.content;

const imageClickHandler = (evt) => {
  showImageModal(evt.target);
}

// Функция добавления событий на отдельно взятую карточку места
const setEventsToCard = (cardItem) => {

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
  cardRemoveButton.addEventListener('click', function(evt) {
    evt.target.parentNode.remove();
  });
}

// Функция возвращает готовую разметку новой карточки
export const createCard = (nameVal, linkVal) => {

  // Клонируем ноду с разметкой карточки
  const clonedCard = cardNodeContent.querySelector(config.cards.itemSelector).cloneNode(true);

  //заполняем html-теги новой карточки
  clonedCard.querySelector(config.cards.imageSelector).src = linkVal;
  clonedCard.querySelector(config.cards.imageSelector).alt = nameVal;
  clonedCard.querySelector(config.cards.nameSelector).textContent = nameVal;

  // Навешиваем на карточку обработчики событий
  setEventsToCard(clonedCard);

  // Возвращаем разметку созданной карточки
  return clonedCard;
}

// Функция добавления карточки в коллекцию на странице
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}
