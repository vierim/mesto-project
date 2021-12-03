import './index.css';

import { config } from '../utils/config.js';
import { elements, inputs, forms } from '../utils/elements.js';
import {
  hidePreloader,
  showError,
  completeFormInputs,
  disableSubmitButton,
  createCard,
} from '../utils/utils.js';

import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupConfirmation } from '../components/PopupConfirmation';

let cardList;

const validationConfig = {
  formSelector: config.popup.formSelector,
  inputSelector: config.form.inputSelector,
  submitButtonSelector: config.form.buttonSelector,
  inactiveButtonClass: config.form.inactiveButtonClass,
  inputErrorClass: config.form.inputErrorClass,
  errorClass: config.form.errorMsgVisibleClass,
  errorMsgPrefix: config.form.errorMsgPrefix,
};

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
  headers: {
    authorization: 'd32353b7-29c6-4530-8908-5ae56ac735f5',
    'Content-Type': 'application/json',
  },
});

const user = new UserInfo(
  {
    nameSelector: config.profile.nameSelector,
    aboutSelector: config.profile.proffesionSelector,
    avatarSelector: config.profile.avatarSelector,
  },
  api
);

const editProfilePopup = new PopupWithForm(config.popup.functionSelector.editProfile, (body) =>
  api
    .changeUserInfo(body)
    .then((res) => user.setUserInfo(res))
    .catch((err) => showError(err))
);

const avatarPopup = new PopupWithForm(config.popup.functionSelector.editAvatar, (body) =>
  api.editAvatar(body).then((res) => user.renderUserAvatar(res))
);

const imagePopup = new PopupWithImage(config.popup.functionSelector.viewPhoto);

const cardPopup = new PopupWithForm(config.popup.functionSelector.addCard, (body) =>
  api
    .postCard(body)
    .then((res) => {
      const userId = user.getUserInfo()._id;

      const card = createCard(res, userId);

      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    })
    .catch((err) => showError(err))
);

const confirmationPopup = new PopupConfirmation(
  config.popup.functionSelector.confirmation,
  (cardId) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        const card = document.getElementById(cardId);

        card.remove();
      })
      .catch((err) => showError(err));
  }
);

const editProfileValidity = new FormValidator(validationConfig, forms.editProfile);
editProfileValidity.enableValidation();

const editAvatarValidity = new FormValidator(validationConfig, forms.editAvatar);
editAvatarValidity.enableValidation();

const addCardValidity = new FormValidator(validationConfig, forms.addCard);
addCardValidity.enableValidation();

Promise.all([api.getUserInfo(), api.getCards()])
  .then((res) => {
    user.setUserInfo(res[0]);
    const userId = user.getUserInfo()._id;

    cardList = new Section(
      {
        items: res[1],
        renderer: (item) => {
          const card = createCard(item, userId);

          const cardElement = card.createCard();
          cardList.addItem(cardElement);
        },
      },
      config.cards.containerSelector
    );

    cardList.renderItems();
  })
  .then(hidePreloader)
  .catch((err) => showError(err, 'console'));

elements.editProfileButton.addEventListener('click', () => {
  editProfilePopup.open();
  const { name, about } = user.getUserInfo();

  completeFormInputs(name, about);
});

elements.editAvatarButton.addEventListener('click', () => {
  avatarPopup.open();

  const avatarInput = inputs.inputAvatar;

  if (avatarInput.value.length === 0) {
    disableSubmitButton(elements.editAvatarPopup);
  }
});

elements.addCardButton.addEventListener('click', () => {
  cardPopup.open();
  disableSubmitButton(elements.addCardPopup);
});
