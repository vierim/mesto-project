import './index.css';

import { config } from '../components/config.js';
import { elements } from '../components/elements.js';
import { setBasicListeners } from '../components/listeners.js';
import { enableValidation } from '../components/validate.js';
import { createCard, addCard } from '../components/cards.js';
import { getUserInfo, getCards } from '../components/api.js';
import { renderUserInfo, renderUserAvatar, showError } from '../components/utils.js';

export const userInfo = {};

getUserInfo()
  .then((res) => {
    userInfo._id = res._id;
    renderUserInfo(res.name, res.about);
    renderUserAvatar(res.name, res.avatar);
  })
  .catch(err => showError(err));

getCards()
  .then(data => {
    data.forEach((item) => {
      addCard(elements.cardsContainer, createCard({
        name: item.name,
        link: item.link,
        id: item._id,
        owner: item.owner._id,
        likes: item.likes
      }));
    })
  })
  .catch(err => showError(err));

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
