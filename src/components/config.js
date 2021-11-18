export const config = {
  profile: {
    selector: '.profile',
    editAvatarSelector: '.profile__edit-avatar',
    editButtonSelector: '.profile__edit-button',
    nameSelector: '.profile__title',
    proffesionSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar',
    addCartSelector: '.profile__add-button'
  },
  popup: {
    selector: '.popup',
    formSelector: '.popup__form',
    imageSelector: '.popup__image',
    figcaptionSelector: '.popup__figcaption',
    functionSelector: {
      editProfile: '.popup__function_edit-profile',
      addCart: '.popup__function_add-cart',
      viewFoto: '.popup__function_view-foto',
      editAvatar: '.popup__function_edit-avatar'
    },
    openedClass: 'popup_opened'
  },
  form: {
    inputSelector: '.form__input',
    buttonSelector: '.form__button',
    inputErrorClass: 'form__input_error',
    errorMsgPrefix: 'error',
    errorMsgVisibleClass: 'form__error-msg_visible',
    inactiveButtonClass: 'form__button_disabled',
    inputs: {
      name: '#name',
      about: '#profession',
      link: '#link',
      avatar: '#pic'
    }
  },
  cards: {
    containerSelector: '.cards__list',
    itemSelector: '.cards__item',
    imageSelector: '.cards__image',
    nameSelector: '.cards__name',
    likeButtonSelector: '.cards__status',
    likesCountSelector: '.cards__likes',
    deleteButtonSelector: '.cards__delete-button',
    deleteButtonVisibleClass: 'cards__delete-button_visible',
    hasLikedClass: 'cards__status_active',
    placeholderClass: 'cards__image_inactive',
    template: '#cards-template'
  },
  preloader: {
    selector: '.preloader'
  }
}
