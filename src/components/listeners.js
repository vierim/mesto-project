import { config } from './config.js';
import { elements } from './elements.js';
import { showPopup } from './modal.js';
import { completeFormInputs, editFormSubmitHandler, addCartSubmitHandler } from './utils.js';

const editProfileForm = elements.editProfilePopup.querySelector(config.popup.formSelector);
const nameInput = editProfileForm.querySelector(config.form.inputs.nameIdent);
const jobInput = editProfileForm.querySelector(config.form.inputs.aboutIdent);

const addCartForm = elements.addCartPopup.querySelector(config.popup.formSelector);

export function setBasicListeners() {

  // Нажатие на кнопку "Редактировать аватар" на самой картинке в секции profile
  elements.editAvatarButton.addEventListener('click', () => {
    showPopup(elements.editAvatarPopup);
  });

  // Нажатие на кнопку "Редактировать профиль" в секции profile
  elements.editProfileButton.addEventListener('click', () => {
    showPopup(elements.editProfilePopup);
    completeFormInputs(nameInput, jobInput);
  });

  // Нажатие на кнопку "Добавить карточку" в секции profile
  elements.addCartButton.addEventListener('click', () => {
    showPopup(elements.addCartPopup);
  });

  // События submit на все рабочие формы в проекте
  editProfileForm.addEventListener('submit', editFormSubmitHandler);
  addCartForm.addEventListener('submit', addCartSubmitHandler);
}
