import './index.css';

import { config } from '../components/config.js';

import { setBasicListeners } from '../components/listeners.js';
import { enableValidation } from '../components/validate.js';
import Section from '../components/Section';
import Card from '../components/cards.js';
import { getUserInfo, getCards } from '../components/api.js';
import { showImageModal } from '../components/modal.js';
import { hidePreloader, renderUserInfo, renderUserAvatar, showError } from '../components/utils.js';

// Объект для хранения данных о пользователе
export const userInfo = {};

const userPromise = getUserInfo();
const cardPromise = getCards();

Promise.all([userPromise, cardPromise])
  .then(res => {

    userInfo._id = res[0]._id;

    renderUserInfo(res[0].name, res[0].about);
    renderUserAvatar(res[0].name, res[0].avatar);

    const cardList = new Section({
      items: res[1],
      renderer: (item) => {

        const card = new Card({
          data: item,
          handleCardClick: (element) => {
            showImageModal(element);
            // здесь вместо showImageModal будет использоваться экземпляр класса Popup или один из его производных
          }
        }, config.cards.template);

        const cardElement = card.createCard();
        cardList.addItem(cardElement);
      } // end of renderer
    }, config.cards.containerSelector); // end of cardList

    cardList.renderItems();
  })
  .then(hidePreloader)
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
