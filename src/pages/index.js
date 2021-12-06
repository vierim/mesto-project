import './index.css';

import { validationConfig } from '../utils/constants.js';
import { config } from '../utils/config.js';
import { elements, forms } from '../utils/elements.js';
import { hidePreloader, showError, completeFormInputs } from '../utils/utils.js';

import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { Card } from '../components/Card.js';

let cardList;

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
    .catch((err) => showError(err, forms.editProfile))
);

const avatarPopup = new PopupWithForm(config.popup.functionSelector.editAvatar, (body) =>
  api
    .editAvatar(body)
    .then((res) => user.renderUserAvatar(res))
    .catch((err) => showError(err, forms.editAvatar))
);

const imagePopup = new PopupWithImage(config.popup.functionSelector.viewPhoto);

const confirmationPopup = new PopupConfirmation(
  config.popup.functionSelector.confirmation,
  (cardId) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        const card = document.getElementById(cardId);

        card.remove();
      })
      .catch((err) => showError(err, 'console'));
  }
);

const cardPopup = new PopupWithForm(config.popup.functionSelector.addCard, (body) =>
  api
    .postCard(body)
    .then((res) => cardList.addItem(res))
    .catch((err) => showError(err, forms.addCard))
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
          const card = new Card(
            {
              data: item,
              userId,
              handleCardClick: (image) => {
                imagePopup.open(image);
              },
              handleDeleteButtonClicked: (idCard) => {
                confirmationPopup.open(idCard);
              },
              handleLikeButtonClick: (idCard, likeElement, likeCounter) => {
                if (!likeElement.classList.contains(config.cards.hasLikedClass)) {
                  api
                    .addLike(idCard)
                    .then((card) => {
                      likeElement.classList.add(config.cards.hasLikedClass);
                      likeCounter.textContent = card.likes.length > 0 ? card.likes.length : '';
                    })
                    .catch((err) => showError(err, 'console'));
                } else {
                  api
                    .removeLike(idCard)
                    .then((card) => {
                      likeElement.classList.remove(config.cards.hasLikedClass);
                      likeCounter.textContent = card.likes.length > 0 ? card.likes.length : '';
                    })
                    .catch((err) => showError(err, 'console'));
                }
              },
            },
            config.cards.template
          );

          return card.createCard();
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

  editProfileValidity.resetValidation();
});

elements.editAvatarButton.addEventListener('click', () => {
  avatarPopup.open();
  editAvatarValidity.resetValidation();
});

elements.addCardButton.addEventListener('click', () => {
  cardPopup.open();
  addCardValidity.resetValidation();
});
