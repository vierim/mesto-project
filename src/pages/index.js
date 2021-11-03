import './index.css';

import { config } from '../components/config.js';
import { setBasicListeners } from '../components/listeners.js';
import { initialCards } from '../components/data.js';
import { createCard, addCard } from '../components/cards.js';

// Инициализация базовых слушателей на странице
// (для видимого функционала, без слушателей на отдельных карточках)
setBasicListeners();

// Получаем ссылку на контейнер, где хранятся все карточки мест
const cardsContainer = document.querySelector(config.cards.containerSelector);

// Инициализация базовых карточек мест на странице (при загрузке)
initialCards.forEach(function(item) {
  addCard(cardsContainer, createCard(item.name, item.link));
});
