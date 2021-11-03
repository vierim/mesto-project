import { config } from './config.js';
import { hidePopup } from './modal.js';
import { addCard, createCard } from './cards.js';

// Получаем текущие значения полей в документе (нужны для 2 из 3 функций)
const profileName = document.querySelector(config.profile.nameSelector);
const profileProfession = document.querySelector(config.profile.proffesionSelector);

// Функция сохранения данных, введенных пользователем в поля в попапе редактирования профиля
export const editFormSubmitHandler = (evt) => {

  evt.preventDefault();

  const editProfilePopup = document.querySelector(config.popup.functionSelector.editProfile);
  const formElement = editProfilePopup.querySelector(config.popup.formSelector);

  const nameInput = formElement.querySelector(config.form.inputs.nameIdent);
  const jobInput = formElement.querySelector(config.form.inputs.aboutIdent);

  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  formElement.removeEventListener('submit', editFormSubmitHandler);

  hidePopup (editProfilePopup);
}

// Функция сохранения данных, введенных пользователем в поля в попапе для добавления карточки
export const addCartSubmitHandler = (evt) => {

  evt.preventDefault();

  const cardsContainer = document.querySelector(config.cards.containerSelector);
  const addCartPopup = document.querySelector(config.popup.functionSelector.addCart);
  const formElement = addCartPopup.querySelector(config.popup.formSelector);

  const cartName = formElement.querySelector(config.form.inputs.nameIdent);
  const cartLink = formElement.querySelector(config.form.inputs.linkIdent);

  addCard(cardsContainer, createCard(cartName.value, cartLink.value));

  //очищаем поля формы (должны быть пустыми для добавления следующей карточки)
  formElement.reset();
  formElement.removeEventListener('submit', addCartSubmitHandler);

  hidePopup (addCartPopup);
}

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, job) => {

  // Вносим полученные значения в переменные (ссылки на элементы полей в показанной форме)
  name.value = profileName.textContent;
  job.value = profileProfession.textContent;
}

