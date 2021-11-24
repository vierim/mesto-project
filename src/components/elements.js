import { config } from "./config.js";

export const elements = {
  preloaderElement: document.querySelector(config.preloader.selector),

  cardsContainer: document.querySelector(config.cards.containerSelector),
  cardsTemplate: document.querySelector(config.cards.template),

  profileName: document.querySelector(config.profile.nameSelector),
  profileProfession: document.querySelector(config.profile.proffesionSelector),
  avatarImage: document.querySelector(config.profile.avatarSelector),

  editAvatarButton: document.querySelector(config.profile.editAvatarSelector),
  editProfileButton: document.querySelector(config.profile.editButtonSelector),
  addCartButton: document.querySelector(config.profile.addCartSelector),

  editAvatarPopup: document.querySelector(
    config.popup.functionSelector.editAvatar
  ),
  editProfilePopup: document.querySelector(
    config.popup.functionSelector.editProfile
  ),
  addCartPopup: document.querySelector(config.popup.functionSelector.addCart),

  modalShowPhoto: document.querySelector(
    config.popup.functionSelector.viewFoto
  ),
  modalImageElement: document.querySelector(config.popup.imageSelector),
  modalTextElement: document.querySelector(config.popup.figcaptionSelector),
};

export const forms = {
  editProfile: elements.editProfilePopup.querySelector(
    config.popup.formSelector
  ),
  addCart: elements.addCartPopup.querySelector(config.popup.formSelector),
  editAvatar: elements.editAvatarPopup.querySelector(config.popup.formSelector),
};

export const popupButtons = {
  editProfile: forms.editProfile.querySelector(config.form.buttonSelector),
  addCart: forms.addCart.querySelector(config.form.buttonSelector),
  editAvatar: forms.editAvatar.querySelector(config.form.buttonSelector),
};

export const inputs = {
  inputProfileName: forms.editProfile.querySelector(config.form.inputs.name),
  inputProfileAbout: forms.editProfile.querySelector(config.form.inputs.about),
  inputAvatar: forms.editAvatar.querySelector(config.form.inputs.avatar),
};
