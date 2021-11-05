import './index.css';

import { config } from '../components/config.js';
import { elements } from '../components/elements.js';
import { setBasicListeners } from '../components/listeners.js';
import { enableValidation } from '../components/validate.js';
import { initialCards } from '../components/data.js';
import { createCard, addCard } from '../components/cards.js';
import { getUserInfo, getCards } from '../components/api.js';

// Инициализация базовых слушателей на странице
// (для видимого функционала, без слушателей на отдельных карточках)
setBasicListeners();

// Активируем валидацию на все формы в проекте
enableValidation({
  formSelector: config.popup.formSelector,
  inputSelector: config.form.inputSelector,
  submitButtonSelector: config.form.buttonSelector,
  inactiveButtonClass: config.form.inactiveButtonClass,
  inputErrorClass: config.form.inputErrorClass,
  errorClass: config.form.errorMsgVisibleClass,
  errorMsgPrefix: config.form.errorMsgPrefix
});

// Инициализация базовых карточек мест на странице (при загрузке)
initialCards.forEach(function(item) {
  addCard(elements.cardsContainer, createCard(item.name, item.link));
});

getUserInfo()
  .then(data => {
    console.log(data);
  });

getCards()
  .then(data => {
    console.log(data);
  });
