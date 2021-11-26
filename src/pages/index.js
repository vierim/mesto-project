import "./index.css";

import { config } from "../components/config.js";
import { elements, inputs } from "../components/elements.js";
import { disableSubmitButton, showImageModal } from "../components/modal.js";

import { setBasicListeners } from "../components/listeners.js";
import { enableValidation } from "../components/validate.js";
// import { createCard, addCard } from "../components/Cards.js";
import {
  hidePreloader,
  showError,
  completeFormInputs,
} from "../components/utils.js";

import { Api } from "../components/Api.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Section from "../components/Section";
import Card from "../components/Cards.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage";

// Добавила CardList в глобальную область видимости,
// чтобы он был доступен в экземпляре класса CardPopup
let cardList;

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

// Объект для хранения данных о пользователе
// export const userInfo = {};

Promise.all([user.getUserInfo(), api.getCards()])
  .then((res) => {
    // userInfo._id = res[0]._id;
    // Получаем наш Id
    const userId = user.getUserInfo()._id;
    //
    cardList = new Section(
      {
        items: res[1],
        renderer: (item) => {
          const card = new Card(
            {
              data: item,
              userId,
              handleCardClick: () => {
                const imagePopup = new PopupWithImage(
                  config.popup.functionSelector.viewFoto,
                  item
                );

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

const editProfilePopup = new PopupWithForm(
  config.popup.functionSelector.editProfile,
  (body) => user.setUserInfo(body)
);

const avatarPopup = new PopupWithForm(
  config.popup.functionSelector.editAvatar,
  (body) =>
    api
      .editAvatar(body)
      .then((res) => user.renderUserAvatar(res))
      .catch((err) => showError(err))
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
            handleCardClick: () => {
              const imagePopup = new PopupWithImage(
                config.popup.functionSelector.viewFoto,
                res
              );

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
  errorMsgPrefix: config.form.errorMsgPrefix,
});
