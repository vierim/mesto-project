// Базовый массив карточек пользователя (показываем при загрузки страницы)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];


const pageElement = document.querySelector('.page');

// Получаем элементы страницы из секции profile
const profileSection = document.querySelector('.profile');

const editAvatarButton = profileSection.querySelector('.profile__edit-avatar');
const editProfileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__title');
const profileProfession = profileSection.querySelector('.profile__subtitle');
const profileAddCartButton = profileSection.querySelector('.profile__add-button');

const popupElements = Array.from(document.querySelectorAll('.popup'));

// Получаем элементы страницы из popup для редактирования профиля (имя, профессия)
const editProfilePopup = document.querySelector('.popup__function_edit-profile');

const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm = editProfilePopup.querySelector('.popup__form');

// Получаем элементы страницы из popup для добавления карточки (места)
const addCartPopup = document.querySelector('.popup__function_add-cart');

const addCartCloseButton = addCartPopup.querySelector('.popup__close-button');
const addCartForm = addCartPopup.querySelector('.popup__form');

// Получаем ссылки на элементы модалки для просмотра увеличенных изображений
const modalShowPhoto = document.querySelector('.popup__function_view-foto');

const showPhotoCloseButton = modalShowPhoto.querySelector('.popup__close-button');
const modalImageElement = modalShowPhoto.querySelector('.popup__image');
const modalTextElement = modalShowPhoto.querySelector('.popup__figcaption');

// Получаем ссылки на элементы модалки для просмотра увеличенных изображений
const modalEditAvatar = document.querySelector('.popup__function_edit-avatar');

// Получаем ссылку на контейнер, где хранятся все карточки мест
const cardsContainer = document.querySelector('.cards__list');


// Функция возвращает разметку новой карточки
function createCard (nameValue, linkValue) {

  // Получаем разметку шаблона карточки и клонируем ноду
  const cardsTemplate = document.querySelector('#cards-template').content;
  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);

  //заполняем html-теги новой карточки
  cardsItem.querySelector('.cards__image').src = linkValue;
  cardsItem.querySelector('.cards__image').alt = nameValue;
  cardsItem.querySelector('.cards__name').textContent = nameValue;

  // Навешиваем на карточку обработчики событий
  cardsItem.querySelector('.cards__image').addEventListener('click', function(evt) { //клик по изображению
    modalImageElement.src = evt.target.src;
    modalImageElement.alt = evt.target.alt;
    modalTextElement.textContent = evt.target.alt;

    showPopup (modalShowPhoto);
  });

  cardsItem.querySelector('.cards__status').addEventListener('click',function(evt) { //клик по иконке лайка
    evt.target.classList.toggle('cards__status_active');
  });

  const removeButton = cardsItem.querySelector('.cards__delete-button');
  removeButton.addEventListener('click', function(evt) { //клик по иконке удаления карточки
    evt.target.parentNode.remove();
  });

  // Возвращаем разметку созданной карточки
  return cardsItem;
}

// Функция добавления карточки в коллекцию
function addCard (container, cardElement) {
  container.prepend(cardElement);
}

// Функция заполнения полей ввода в popup данными профиля (имя, профессия)
function completeFormInputs (popupWindow) {

  const formElement = popupWindow.querySelector('.popup__form');

  const nameInput = formElement.querySelector('#name');
  const jobInput = formElement.querySelector('#profession');

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

// Две функции для отображения и скрытия попап окна (добавление/удаление класса)
function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  // Добавляем слушатель нажатия на клавиатуру на всю страницу
  pageElement.addEventListener('keydown', closePopupHandler);
}

function hidePopup (popupElement) {
  popupElement.classList.remove('popup_opened');

  // Удаляем слушатель нажатия на клавиатуру на всю страницу
  pageElement.removeEventListener('keydown', closePopupHandler);
}

// Функция сохранения данных, введенных пользователем в поля в попапе редактирования профиля
function editFormSubmitHandler (evt) {

  evt.preventDefault();

  const nameInput = editProfileForm.querySelector('#name');
  const jobInput = editProfileForm.querySelector('#profession');

  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  hidePopup (editProfilePopup);
}

// Функция сохранения данных, введенных пользователем в поля в попапе для добавления карточки
function addCartSubmitHandler (evt) {

  evt.preventDefault();

  const cartName = addCartForm.querySelector('#cart-name');
  const cartLink = addCartForm.querySelector('#cart-link');

  addCard (cardsContainer, createCard(cartName.value, cartLink.value));

  //очищаем поля формы (должны быть пустыми для добавления следующей карточки)
  addCartForm.reset();

  hidePopup (addCartPopup);
}

// Функция для проверки клика по попап - вызывает функцию закрытие попапа при клике на кнопку закрытия или при клике на overlay
function closePopupHandler (evt) {
  const isCloseButtonClicked = evt.target.classList.contains('popup__close-button');
  const isOverlayClicked = evt.target.classList.contains('popup');
  const isEscapePressed = (evt.key && evt.key === 'Escape');

  if(isOverlayClicked) {
    hidePopup(evt.target);
  } else if (isCloseButtonClicked) {
    hidePopup(evt.target.parentNode.offsetParent);
  } else if (isEscapePressed) {
    let openedPopupElement = document.querySelector('.popup_opened');
    hidePopup(openedPopupElement);
  }
}

const hasInvalidInput = inputList => {
  return inputList.every(item => item.validity.valid);
}

const toggleButtonActivity = (inputList, buttonElement) => {
  if(!hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('form__button_disabled');
    buttonElement.disabled = false;
  }
}

const hideErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.remove('form__input_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__error-msg_visible');
}

const showErrorText = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.add('form__input_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('form__error-msg_visible');
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showErrorText(formElement, inputElement);
  } else {
    hideErrorText(formElement, inputElement);
  }
}

const setFormEventListeners = elements => {
  elements.formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });

  const inputList = Array.from(elements.formElement.querySelectorAll(elements.inputSelector));
  const buttonElement = elements.formElement.querySelector(elements.buttonSelector);

  console.log(buttonElement);

  inputList.forEach(item => {
    item.addEventListener('input', () => {
      checkInputValidity(elements.formElement, item);

      toggleButtonActivity(inputList, buttonElement);
    });
  });

  toggleButtonActivity(inputList, buttonElement);
}

const enableValidation = (formObj) => {

  const popupElement = document.querySelector(formObj.popupSelector);
  const formElement = popupElement.querySelector(formObj.formSelector);

  setFormEventListeners({
    formElement: formElement,
    inputSelector: formObj.inputSelector,
    buttonSelector: formObj.submitButtonSelector
  });
}

function setEventListeners() {

  editAvatarButton.addEventListener('click', () => {
    showPopup(modalEditAvatar);
  });

  // Добавляем слушатели клика мышкой для каждого попапа
  popupElements.forEach(element => {
    element.addEventListener('click', closePopupHandler);
  });
}

// Навешиваем обработчики событий

editProfileButton.addEventListener('click', () => { // редактировать профиль
  showPopup(editProfilePopup);
  completeFormInputs(editProfilePopup);
  enableValidation({
    popupSelector: '.popup__function_edit-profile',
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__error-msg_visible'
  });
});

profileAddCartButton.addEventListener('click', () => { // добавить карточку
  showPopup (addCartPopup);
});

editProfileForm.addEventListener('submit', editFormSubmitHandler); // сохранить изменения в попапе
addCartForm.addEventListener('submit', addCartSubmitHandler); // добавление карточки пользователем

setEventListeners();

// Инициализация базовых карточек мест на странице (при загрузке)

initialCards.forEach(function(item) {
  addCard (cardsContainer, createCard(item.name, item.link));
});
