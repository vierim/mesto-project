import { config } from './config.js';
import { elements } from './elements.js';
import { showImageModal } from './modal.js';

// Получаем разметку шаблона карточки
const cardNodeText = elements.cardsTemplate.content;

// Функция добавления событий на отдельно взятую карточку места
const setEventsToCard = (cardItem) => {

  // Клик по изображению
  cardItem.querySelector(config.cards.imageSelector).addEventListener('click', function(evt) {
    showImageModal(evt.target);
  });

  // Клик по иконке лайка
  cardItem.querySelector(config.cards.likeButtonSelector).addEventListener('click', function(evt) {
    evt.target.classList.toggle(config.cards.hasLikedClass);
  });

  // Клик по иконке удаления карточки
  const removeButton = cardItem.querySelector(config.cards.deleteButtonSelector);
  removeButton.addEventListener('click', function(evt) {
    evt.target.parentNode.remove();
  });
}

// Функция возвращает готовую разметку новой карточки
export const createCard = (nameVal, linkVal) => {

  // Клонируем ноду с разметкой карточки
  const clonedCard = cardNodeText.querySelector(config.cards.itemSelector).cloneNode(true);

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
