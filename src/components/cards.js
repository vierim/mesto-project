import { config } from './config.js';
import { showImageModal } from './modal.js';

// Функция добавления событий на отдельно взятую карточку места
const setEventsToCard = cardItem => {

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
export const createCard = (nameValue, linkValue) => {

  // Получаем разметку шаблона карточки и клонируем ноду
  const cardsTemplate = document.querySelector(config.cards.templateId).content;
  const cardItem = cardsTemplate.querySelector(config.cards.itemSelector).cloneNode(true);

  //заполняем html-теги новой карточки
  cardItem.querySelector(config.cards.imageSelector).src = linkValue;
  cardItem.querySelector(config.cards.imageSelector).alt = nameValue;
  cardItem.querySelector(config.cards.nameSelector).textContent = nameValue;

  // Навешиваем на карточку обработчики событий
  setEventsToCard(cardItem);

  // Возвращаем разметку созданной карточки
  return cardItem;
}

// Функция добавления карточки в коллекцию на странице
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}
