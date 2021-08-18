// Получаем объекты из секции profile
const profileSection = document.querySelector('.profile');

const editProfileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__title');
const profileProfession = profileSection.querySelector('.profile__subtitle');

// Получаем объекты из popup
const popupWindow = document.querySelector('.popup');

const popupCloseButton = popupWindow.querySelector('.popup__close-button');
const formElement = popupWindow.querySelector('.popup__form');

// Функция открытия/закрытия попапа
function displayPopupForm () {

  // Если окно было закрыто, подгружаем в поля inout текущие данные с именем и профессией
  if(!popupWindow.classList.contains('popup_opened')) {

    const nameInput = formElement.querySelectorAll('.popup__input-item')[0];
    const jobInput = formElement.querySelectorAll('.popup__input-item')[1];

    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
  }

  popupWindow.classList.toggle('popup_opened');
}

// Функция сохранения данных, введенных пользователем в поля в попапе
function formSubmitHandler (evt) {
  evt.preventDefault();

  const nameInput = formElement.querySelectorAll('.popup__input-item')[0];
  const jobInput = formElement.querySelectorAll('.popup__input-item')[1];

  // Обработка исключений
  if (nameInput.value.length > 100) {
    nameInput.value = '1';
  } else if (jobInput.value.length > 200) {
    jobInput.value = '2';
  } else {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;

    displayPopupForm ();
  }
}

// Навешиваем обработчики событий
editProfileButton.addEventListener('click', displayPopupForm); // редактировать профиль
popupCloseButton.addEventListener('click', displayPopupForm); // закрыть попап
formElement.addEventListener('submit', formSubmitHandler); // сохранить изменения в попапе
