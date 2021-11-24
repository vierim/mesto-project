import { config } from "./config.js";
import { elements, forms } from "./elements.js";
import { showPopup, disableSubmitButton } from "./modal.js";
import { completeFormInputs, addCartSubmitHandler } from "./utils.js";

export function setBasicListeners() {
  const nameInput = forms.editProfile.querySelector(config.form.inputs.name);
  const jobInput = forms.editProfile.querySelector(config.form.inputs.about);
  const avatarInput = forms.editAvatar.querySelector(config.form.inputs.avatar);

  // Нажатие на кнопку "Редактировать аватар" на самой картинке в секции profile
  // elements.editAvatarButton.addEventListener("click", () => {
  //   popup.open(elements.editAvatarPopup);

  //   // Проверяем наличие данных в поле для адреса аватарки
  //   // * Данные могут остаться в поле, если пользователь встретил ошибку при прошлой попытке смены аватарки
  //   if (avatarInput.value.length === 0) {
  //     disableSubmitButton(elements.editAvatarPopup);
  //   }
  // });

  // Нажатие на кнопку "Редактировать профиль" в секции profile
  // elements.editProfileButton.addEventListener("click", () => {
  //   popup.open(elements.editProfilePopup);
  //   completeFormInputs(nameInput, jobInput);
  // });

  //   // Нажатие на кнопку "Добавить карточку" в секции profile
  //   elements.addCartButton.addEventListener("click", () => {
  //     popup.open(elements.addCartPopup);
  //     disableSubmitButton(elements.addCartPopup);
  //   });

  //   // События submit на все рабочие формы в проекте
  //   forms.addCart.addEventListener("submit", addCartSubmitHandler);
  //   forms.editAvatar.addEventListener("submit", editAvatarSubmitHandler);
}
