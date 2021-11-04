import { config } from './config.js';
import { elements } from './elements.js';

const keyboardPopupHandler = (evt) => {

  const openedPopupElement = document.querySelector(`.${config.popup.openedClass}`);

  if(evt.key && evt.key === 'Escape') {
    hidePopup(openedPopupElement);
  }
}

const clickPopupHandler = (evt) => {

  const isCloseButtonClicked = evt.target.classList.contains('popup__close-button');
  const isOverlayClicked = evt.target.classList.contains('popup');

  if(isOverlayClicked) {
    hidePopup(evt.target);
  } else if (isCloseButtonClicked) {
    hidePopup(evt.target.parentNode.offsetParent);
  }
}

export const showPopup = (popupElement) => {

  popupElement.classList.add(config.popup.openedClass);

  // Добавляем слушатель клика мышкой на popup
  popupElement.addEventListener('click', clickPopupHandler);

  // Добавляем слушатель нажатия на клавиатуру на всю страницу
  elements.pageElement.addEventListener('keydown', keyboardPopupHandler);
}

export const hidePopup = (popupElement) => {

  popupElement.classList.remove(config.popup.openedClass);

  // Удаляем слушатель нажатия на клавиатуру на всю страницу
  elements.pageElement.removeEventListener('keydown', keyboardPopupHandler);
}

export const showImageModal = (img) => {

  elements.modalImageElement.src = img.src;
  elements.modalImageElement.alt = img.alt;
  elements.modalTextElement.textContent = img.alt;

  showPopup(elements.modalShowPhoto);
}
