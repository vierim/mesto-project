import "./index.css";

import { config } from "../components/config.js";
import { elements, inputs, forms } from "../components/elements.js";
import { disableSubmitButton } from "../components/modal.js";

import {
  hidePreloader,
  showError,
  completeFormInputs,
  setModalImageParam,
} from "../components/utils.js";

import { Api } from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section";
import Card from "../components/Cards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

// Добавила CardList в глобальную область видимости,
// чтобы он был доступен в экземпляре класса CardPopup
let cardList;

const validationConfig = {
  formSelector: config.popup.formSelector,
  inputSelector: config.form.inputSelector,
  submitButtonSelector: config.form.buttonSelector,
  inactiveButtonClass: config.form.inactiveButtonClass,
  inputErrorClass: config.form.inputErrorClass,
  errorClass: config.form.errorMsgVisibleClass,
  errorMsgPrefix: config.form.errorMsgPrefix,
}

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "27fae40c-b0f9-46c9-bf33-d2f2bfaeebe1",
    "Content-Type": "application/json",
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

const editProfilePopup = new PopupWithForm(
  config.popup.functionSelector.editProfile,
  (body) =>
    api
      .changeUserInfo(body)
      .then((res) => user.setUserInfo(res))
      .catch((err) => showError(err))
);

const avatarPopup = new PopupWithForm(
  config.popup.functionSelector.editAvatar,
  (body) =>
    api
      .editAvatar(body)
      .then((res) => user.renderUserAvatar(res))
      .catch((err) => showError(err))
);

const imagePopup = new PopupWithImage(
  config.popup.functionSelector.viewFoto
);

const cardPopup = new PopupWithForm(
  config.popup.functionSelector.addCart,
  (body) =>
    api
      .postCard(body)
      .then((res) => {
        // Получаем наш Id
        const userId = user.getUserInfo()._id;
        const card = new Card(
          {
            data: res,
            userId,
            handleCardClick: (item) => {
              setModalImageParam(item.link, item.name);
              imagePopup.open();
            },
          },
          config.cards.template
        );

        const cardElement = card.createCard();

        cardList.addItem(cardElement);
      })
      .catch((err) => showError(err))
);

elements.editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const { name, about } = user.getUserInfo();

  completeFormInputs(name, about);
});

elements.editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();

  const avatarInput = inputs.inputAvatar;

  if (avatarInput.value.length === 0) {
    disableSubmitButton(elements.editAvatarPopup);
  }
});

elements.addCartButton.addEventListener("click", () => {
  cardPopup.open();
  disableSubmitButton(elements.addCartPopup);
});

const editProfileValidity = new FormValidator(validationConfig, forms.editProfile);
editProfileValidity.enableValidation();

const editAvatarValidity = new FormValidator(validationConfig, forms.editAvatar);
editAvatarValidity.enableValidation();

const addCartValidity = new FormValidator(validationConfig, forms.addCart);
addCartValidity.enableValidation();

Promise.all([api..getUserInfo(), api.getCards()])
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
              handleCardClick: (item) => {
                setModalImageParam(item.link, item.name);
                imagePopup.open();
              },
            },
            config.cards.template
          );

          const cardElement = card.createCard();
          cardList.addItem(cardElement);
        }, // end of renderer
      },
      config.cards.containerSelector
    ); // end of cardList

    cardList.renderItems();
  })
  .then(hidePreloader)
  .catch((err) => showError(err));
