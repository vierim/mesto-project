import { config } from './config.js';
import { elements, forms } from './elements.js';
import { hidePopup } from './modal.js';
import { addCard, createCard } from './cards.js';
import { changeUserInfo, editAvatar, postCard } from './api.js';
import { renderUserInfo, renderUserAvatar } from './user.js';

export const editAvatarSubmitHandler = (evt) => {

  const avatarInput = forms.editAvatar.querySelector(config.form.inputs.avatar);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  editAvatar(avatarInput.value)
    .then((res) => {
      renderUserAvatar(res.name, res.avatar);
    });

  forms.editAvatar.reset();
  hidePopup (elements.editAvatarPopup);
}

// Событие submit на форме редактирования профиля
export const editFormSubmitHandler = (evt) => {

  const nameInput = forms.editProfile.querySelector(config.form.inputs.name);
  const jobInput = forms.editProfile.querySelector(config.form.inputs.about);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  // Сохраняем изменения на страницу
  renderUserInfo(nameInput.value, jobInput.value);

  // Сохраняем изменения на сервере
  changeUserInfo(nameInput.value, jobInput.value);

  // Закрываем попап
  hidePopup (elements.editProfilePopup);
}

// Событие submit на форме добавления карточки
export const addCartSubmitHandler = (evt) => {

  const titleInput = forms.addCart.querySelector(config.form.inputs.name);
  const linkInput = forms.addCart.querySelector(config.form.inputs.link);

  // Отключаем базовую обработку события (submit в данном случае)
  evt.preventDefault();

  postCard(titleInput.value, linkInput.value)
    .then((res) => {
      // Добавляем карточку на страницу
      addCard(elements.cardsContainer, createCard({
        name: res.name,
        link: res.link,
        id: res._id,
        owner: res.owner._id
      }));
    })

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
