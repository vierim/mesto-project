import { config } from './config.js';
import { elements } from './elements.js';

export const disableSubmitButton = (popupElement) => {

  const buttonElement = popupElement.querySelector(config.form.buttonSelector);

  buttonElement.classList.add(config.form.inactiveButtonClass);
  buttonElement.disabled = true;
}

export const setButtonState = (button, isSending) => {
  button.disabled = isSending;
  button.textContent = isSending ? 'Сохранение...' : 'Сохранить';
}

const keyboardPopupHandler = (evt) => {

  if(evt.key && evt.key === 'Escape') {
    const openedPopupElement = document.querySelector(`.${config.popup.openedClass}`);

    hidePopup(openedPopupElement);
  }
}

const clickPopupHandler = (evt) => {

  const isCloseButtonClicked = evt.target.classList.contains('popup__close-button');
  const isOverlayClicked = evt.target.classList.contains('popup');

  if(isOverlayClicked || isCloseButtonClicked) {
    hidePopup(evt.currentTarget);
  }
}

export const showPopup = (popupElement) => {

  popupElement.classList.add(config.popup.openedClass);

  // Добавляем слушатель клика мышкой на popup
  popupElement.addEventListener('click', clickPopupHandler);

  // Добавляем слушатель нажатия на клавиатуру на всю страницу
  document.addEventListener('keydown', keyboardPopupHandler);
}

export const hidePopup = (popupElement) => {

  popupElement.classList.remove(config.popup.openedClass);

  // Удаляем слушатели при закрытии попап
  popupElement.removeEventListener('click', clickPopupHandler);
  document.removeEventListener('keydown', keyboardPopupHandler);
}

export const showImageModal = (img) => {

  elements.modalImageElement.src = img.src;
  elements.modalImageElement.alt = img.alt;
  elements.modalTextElement.textContent = img.alt;

  showPopup(elements.modalShowPhoto);
}
