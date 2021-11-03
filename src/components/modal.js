import { config } from './config.js';

const closePopupHandler = evt => {
  const isCloseButtonClicked = evt.target.classList.contains('popup__close-button');
  const isOverlayClicked = evt.target.classList.contains('popup');
  const isEscapePressed = (evt.key && evt.key === 'Escape');

  if(isOverlayClicked) {
    hidePopup(evt.target);
  } else if (isCloseButtonClicked) {
    hidePopup(evt.target.parentNode.offsetParent);
  } else if (isEscapePressed) {
    let openedPopupElement = document.querySelector(`.${config.popup.openedClass}`);
    hidePopup(openedPopupElement);
  }
}

export const showPopup = popupElement => {
  popupElement.classList.add(config.popup.openedClass);

  // Добавляем слушатель клика мышкой на popup
  popupElement.addEventListener('click', closePopupHandler);

  // Добавляем слушатель нажатия на клавиатуру на всю страницу
  const pageElement = document.querySelector(config.pageSelector);
  pageElement.addEventListener('keydown', closePopupHandler);
}

export const hidePopup = popupElement => {
  popupElement.classList.remove(config.popup.openedClass);

  // Удаляем слушатель клика мышкой на popup
  popupElement.removeEventListener('click', closePopupHandler);

  // Удаляем слушатель нажатия на клавиатуру на всю страницу
  const pageElement = document.querySelector(config.pageSelector);
  pageElement.removeEventListener('keydown', closePopupHandler);
}

export const showImageModal = img => {

  const modalShowPhoto = document.querySelector(config.popup.functionSelector.viewFoto);
  const modalImageElement = modalShowPhoto.querySelector(config.popup.imageSelector);
  const modalTextElement = modalShowPhoto.querySelector(config.popup.figcaptionSelector);

  modalImageElement.src = img.src;
  modalImageElement.alt = img.alt;
  modalTextElement.textContent = img.alt;

  showPopup(modalShowPhoto);
}
