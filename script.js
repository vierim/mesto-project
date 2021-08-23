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

// Получаем объекты из секции profile
const profileSection = document.querySelector('.profile');

const editProfileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__title');
const profileProfession = profileSection.querySelector('.profile__subtitle');

// Получаем объекты из popup
const popupWindow = document.querySelector('.popup');

const popupCloseButton = popupWindow.querySelector('.popup__close-button');
const formElement = popupWindow.querySelector('.popup__form');

const cardsContainer = document.querySelector('.cards__list');

// Функция добавления карточки в коллекцию
function addCard (nameValue, linkValue) {

  const cardsTemplate = document.querySelector('#cards-template').content;
  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);

  cardsItem.querySelector('.cards__image').src = linkValue;
  cardsItem.querySelector('.cards__name').textContent = nameValue;

  cardsItem.querySelector('.cards__status').addEventListener('click',function(evt) {
    evt.target.classList.toggle('cards__status_active');
  });

  cardsContainer.append(cardsItem);
}

// Функция открытия/закрытия попапа
function displayPopupForm () {

  // Если окно было закрыто, подгружаем в поля inout текущие данные с именем и профессией
  if(!popupWindow.classList.contains('popup_opened')) {

    const nameInput = formElement.querySelector('#name');
    const jobInput = formElement.querySelector('#profession');

    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
  }

  popupWindow.classList.toggle('popup_opened');
}

// Функция сохранения данных, введенных пользователем в поля в попапе
function formSubmitHandler (evt) {

  evt.preventDefault();

  const nameInput = formElement.querySelector('#name');
  const jobInput = formElement.querySelector('#profession');

  // Обработка исключений (реализовать позже).

  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  displayPopupForm ();
}

// Навешиваем обработчики событий
editProfileButton.addEventListener('click', displayPopupForm); // редактировать профиль
popupCloseButton.addEventListener('click', displayPopupForm); // закрыть попап
formElement.addEventListener('submit', formSubmitHandler); // сохранить изменения в попапе

initialCards.forEach(function(item) {
  addCard (item.name, item.link)
});
