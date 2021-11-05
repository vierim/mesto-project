import { config } from './config.js';
import { elements, forms } from './elements.js';
import { hidePopup } from './modal.js';
import { addCard, createCard } from './cards.js';

// Функция для сохранения изменений на страницу
const saveProfileChanges = (name, job) => {

  elements.profileName.textContent = name;
  elements.profileProfession.textContent = job;
}

// Событие submit на форме редактирования профиля
export const editFormSubmitHandler = (evt) => {

  const nameInput = forms.editProfile.querySelector(config.form.inputs.name);
  const jobInput = forms.editProfile.querySelector(config.form.inputs.about);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  // Сохраняем изменения на страницу
  saveProfileChanges(nameInput.value, jobInput.value);

  // Закрываем попап
  hidePopup (elements.editProfilePopup);
}

// Событие submit на форме добавления карточки
export const addCartSubmitHandler = (evt) => {

  const titleInput = forms.addCart.querySelector(config.form.inputs.name);
  const linkInput = forms.addCart.querySelector(config.form.inputs.link);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  // Добавляем карточку на страницу
  addCard(elements.cardsContainer, createCard(titleInput.value, linkInput.value));

  //очищаем поля формы (должны быть пустыми для добавления следующей карточки)
  forms.addCart.reset();

  // Закрываем попап
  hidePopup (elements.addCartPopup);
}

// Функция заполнения полей ввода в popup данными профиля (имя, профессия) при открытии модалки
export const completeFormInputs = (name, job) => {

  // Вносим полученные значения в переменные (ссылки на элементы полей в показанной форме)
  name.value = elements.profileName.textContent;
  job.value = elements.profileProfession.textContent;
}

