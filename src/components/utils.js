import { config } from './config.js';
import { elements, forms, popupButtons } from './elements.js';
import { hidePopup, setButtonState } from './modal.js';
// import { changeUserInfo, editAvatar, postCard } from './api.js';

import Card from './Cards.js';

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

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, job) => {
  // Вносим полученные значения в переменные (ссылки на элементы полей в показанной форме)
  name.value = elements.profileName.textContent;
  job.value = elements.profileProfession.textContent;
};
