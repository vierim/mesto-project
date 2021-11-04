import { config } from './config.js';
import { showPopup } from './modal.js';
import { completeFormInputs, editFormSubmitHandler, addCartSubmitHandler } from './utils.js';

export function setBasicListeners() {

  const editAvatarButton = document.querySelector(config.profile.editAvatarSelector);
  const editProfileButton = document.querySelector(config.profile.editButtonSelector);
  const addCartButton = document.querySelector(config.profile.addCartSelector);

  // Нажатие на кнопку "Редактировать аватар" на самой картинке в секции profile
  editAvatarButton.addEventListener('click', () => {

    const editAvatarPopup = document.querySelector(config.popup.functionSelector.editAvatar);
    showPopup(editAvatarPopup);
  });

  // Нажатие на кнопку "Редактировать профиль" в секции profile
  editProfileButton.addEventListener('click', () => {

    const editProfilePopup = document.querySelector(config.popup.functionSelector.editProfile);

    const formElement = editProfilePopup.querySelector(config.popup.formSelector);
    const nameInputElement = formElement.querySelector(config.form.inputs.nameIdent);
    const jobInputElement = formElement.querySelector(config.form.inputs.aboutIdent);

    showPopup(editProfilePopup);
    completeFormInputs(nameInputElement, jobInputElement);

    formElement.addEventListener('submit', editFormSubmitHandler);
  });

  // Нажатие на кнопку "Добавить карточку" в секции profile
  addCartButton.addEventListener('click', () => {

    const addCartPopup = document.querySelector(config.popup.functionSelector.addCart);
    const formElement = addCartPopup.querySelector(config.popup.formSelector);

    showPopup(addCartPopup);

    formElement.addEventListener('submit', addCartSubmitHandler);
  });
}
