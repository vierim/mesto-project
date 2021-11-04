import { config } from './config.js';
import { elements } from './elements.js';
import { hidePopup } from './modal.js';
import { addCard, createCard } from './cards.js';

const editProfileForm = elements.editProfilePopup.querySelector(config.popup.formSelector);
const nameInput = editProfileForm.querySelector(config.form.inputs.nameIdent);
const jobInput = editProfileForm.querySelector(config.form.inputs.aboutIdent);

const addCartForm = elements.addCartPopup.querySelector(config.popup.formSelector);
const cartName = addCartForm.querySelector(config.form.inputs.nameIdent);
const cartLink = addCartForm.querySelector(config.form.inputs.linkIdent);

// Событие submit на форме редактирования профиля (функция сохраняет изменения в данных и закрывает попап)
export const editFormSubmitHandler = (evt) => {

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  // Сохраняем изменения на страницу
  elements.profileName.textContent = nameInput.value;
  elements.profileProfession.textContent = jobInput.value;

  // Закрываем попап
  hidePopup (elements.editProfilePopup);
}

// Функция сохранения данных, введенных пользователем в поля в попапе для добавления карточки
export const addCartSubmitHandler = (evt) => {

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  // Добавляем карточку на страницу
  addCard(elements.cardsContainer, createCard(cartName.value, cartLink.value));

  //очищаем поля формы (должны быть пустыми для добавления следующей карточки)
  addCartForm.reset();

  // Закрываем попап
  hidePopup (elements.addCartPopup);
}

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, job) => {

  // Вносим полученные значения в переменные (ссылки на элементы полей в показанной форме)
  name.value = elements.profileName.textContent;
  job.value = elements.profileProfession.textContent;
}

