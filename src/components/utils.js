import { config } from "./config.js";
import { elements, forms, popupButtons } from "./elements.js";
import { hidePopup, setButtonState } from "./modal.js";
import { addCard, createCard } from "./cards.js";

import { Api } from "../components/Api.js";
import { Popup } from "../components/Popup.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "27fae40c-b0f9-46c9-bf33-d2f2bfaeebe1",
    "Content-Type": "application/json",
  },
});

const popup = new Popup(config.popup.selector);

export const showPreloader = () => {
  elements.preloaderElement.classList.add("preloader_active");
};

export const hidePreloader = () => {
  elements.preloaderElement.classList.remove("preloader_active");
};

export const showError = (err) => {
  console.log(`Возникли проблемы при работе с сервером: ${err}`);
};

export const renderUserInfo = ({ name, about }) => {
  elements.profileName.textContent = name;
  elements.profileProfession.textContent = about;
};

export const renderUserAvatar = ({ name, avatar }) => {
  elements.avatarImage.src = avatar;
  elements.avatarImage.alt = `Аватар пользователя ${name}`;
};

// Событие submit на форме добавления карточки
export const addCartSubmitHandler = (evt) => {
  const titleInput = forms.addCart.querySelector(config.form.inputs.name);
  const linkInput = forms.addCart.querySelector(config.form.inputs.link);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  setButtonState(popupButtons.addCart, true);

  api
    .postCard(titleInput.value, linkInput.value)
    .then((res) => {
      // Добавляем карточку на страницу
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
      popup.close(elements.addCartPopup);
      forms.addCart.reset();
    })
    .catch((err) => showError(err))
    .finally(() => {
      setButtonState(popupButtons.addCart, false);
    });
};

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, job) => {
  // Вносим полученные значения в переменные (ссылки на элементы полей в показанной форме)
  name.value = elements.profileName.textContent;
  job.value = elements.profileProfession.textContent;
};
