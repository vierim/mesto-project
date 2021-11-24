import "./index.css";

import { config } from "../components/config.js";
import { elements, forms } from "../components/elements.js";
import { disableSubmitButton } from "../components/modal.js";

import { setBasicListeners } from "../components/listeners.js";
import { enableValidation } from "../components/validate.js";
import { createCard, addCard } from "../components/cards.js";
import {
  hidePreloader,
  renderUserInfo,
  renderUserAvatar,
  showError,
  completeFormInputs,
} from "../components/utils.js";

import { Api } from "../components/Api.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "27fae40c-b0f9-46c9-bf33-d2f2bfaeebe1",
    "Content-Type": "application/json",
  },
});

const editProfilePopup = new PopupWithForm(
  config.popup.functionSelector.editProfile,
  (body) =>
    api
      .changeUserInfo(body)
      .then(renderUserInfo)
      .catch((err) => showError(err))
);

elements.editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();

  const nameInput = forms.editProfile.querySelector(config.form.inputs.name);
  const jobInput = forms.editProfile.querySelector(config.form.inputs.about);

  completeFormInputs(nameInput, jobInput);
});

const avatarPopup = new PopupWithForm(
  config.popup.functionSelector.editAvatar,
  (body) =>
    api
      .editAvatar(body)
      .then(renderUserAvatar)
      .catch((err) => showError(err))
);

elements.editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();

  const avatarInput = forms.editAvatar.querySelector(config.form.inputs.avatar);

  if (avatarInput.value.length === 0) {
    disableSubmitButton(elements.editAvatarPopup);
  }
});

const cardPopup = new PopupWithForm(
  config.popup.functionSelector.addCart,
  (body) =>
    api
      .postCard(body)
      .then((res) => {
        addCard(
          elements.cardsContainer,
          createCard({
            name: res.name,
            link: res.link,
            id: res._id,
            owner: res.owner._id,
            likes: res.likes,
          })
        );
      })
      .catch((err) => showError(err))
);

elements.addCartButton.addEventListener("click", () => {
  cardPopup.open();
  disableSubmitButton(elements.addCartPopup);
});

// Объект для хранения данных о пользователе
export const userInfo = {};

const userPromise = api.getUserInfo();
const cardPromise = api.getCards();

Promise.all([userPromise, cardPromise])
  .then((res) => {
    userInfo._id = res[0]._id;

    renderUserInfo(res[0]);
    renderUserAvatar(res[0]);

    res[1].forEach((item) => {
      addCard(
        elements.cardsContainer,
        createCard({
          name: item.name,
          link: item.link,
          id: item._id,
          owner: item.owner._id,
          likes: item.likes,
        })
      );
    });
  })
  .then(hidePreloader)
  .catch((err) => showError(err));

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
