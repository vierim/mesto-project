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


// Получаем элементы страницы из секции profile
const profileSection = document.querySelector('.profile');

const editProfileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__title');
const profileProfession = profileSection.querySelector('.profile__subtitle');
const profileAddCartButton = profileSection.querySelector('.profile__add-button');

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

// Фукнция очищает поля для ввода информации input в форме
function clearInputFields (formElement) {
  const inputElements = formElement.querySelectorAll('input');

  inputElements.forEach((item) => {
    item.value = '';
  });
}

// Две функции для отображения и скрытия попап окна (добавление/удаление класса)
function showPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

function hidePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
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
  clearInputFields (addCartForm);

  hidePopup (addCartPopup);
}


// Навешиваем обработчики событий

editProfileButton.addEventListener('click', () => { // редактировать профиль
  showPopup (editProfilePopup);
  completeFormInputs (editProfilePopup);
});

editProfileCloseButton.addEventListener('click', () => { // закрыть попап редактирование профиля
  hidePopup (editProfilePopup);
});

profileAddCartButton.addEventListener('click', () => { // добавить карточку
  showPopup (addCartPopup);
});

addCartCloseButton.addEventListener('click', () => { // закрыть попап добавления карточки
  hidePopup (addCartPopup);
});

showPhotoCloseButton.addEventListener('click', () => { // закрыть попап с большой фотографией
  hidePopup (modalShowPhoto);
});

editProfileForm.addEventListener('submit', editFormSubmitHandler); // сохранить изменения в попапе
addCartForm.addEventListener('submit', addCartSubmitHandler); // добавление карточки пользователем


// Инициализация базовых карточек мест на странице (при загрузке)

initialCards.forEach(function(item) {
  addCard (cardsContainer, createCard(item.name, item.link));
});
