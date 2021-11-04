import { config } from './config.js';

export const elements = {
  pageElement: document.querySelector(config.pageSelector),

  cardsContainer: document.querySelector(config.cards.containerSelector), //контейнер, где хранятся все карточки мест
  cardsTemplate: document.querySelector(config.cards.templateId), //шаблон карточки места

  profileName: document.querySelector(config.profile.nameSelector),
  profileProfession: document.querySelector(config.profile.proffesionSelector),

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
