import { config } from './config.js';

export const elements = {
  cardsContainer: document.querySelector(config.cards.containerSelector),
  cardsTemplate: document.querySelector(config.cards.template),

  profileName: document.querySelector(config.profile.nameSelector),
  profileProfession: document.querySelector(config.profile.proffesionSelector),
  avatarImage: document.querySelector(config.profile.avatarSelector),

  editAvatarButton: document.querySelector(config.profile.editAvatarSelector),
  editProfileButton: document.querySelector(config.profile.editButtonSelector),
  addCartButton: document.querySelector(config.profile.addCartSelector),

  editAvatarPopup: document.querySelector(config.popup.functionSelector.editAvatar),
  editProfilePopup: document.querySelector(config.popup.functionSelector.editProfile),
  addCartPopup: document.querySelector(config.popup.functionSelector.addCart),

  modalShowPhoto: document.querySelector(config.popup.functionSelector.viewFoto),
  modalImageElement: document.querySelector(config.popup.imageSelector),
  modalTextElement: document.querySelector(config.popup.figcaptionSelector)
}

export const forms = {
  editProfile: elements.editProfilePopup.querySelector(config.popup.formSelector),
  addCart: elements.addCartPopup.querySelector(config.popup.formSelector),
  editAvatar: elements.editAvatarPopup.querySelector(config.popup.formSelector)
}
