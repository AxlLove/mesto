export const validConfig = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__edit',
  popupOpenButtonSelector: '.profile__button',
  errorSelector: '.pop-up__error-massage',
  submitButtonSelector: '.pop-up__save-edit-button',
  inactiveButtonClass: 'pop-up__save-edit-button_disabled',
  inputErrorClass: 'pop-up__edit_type_error',
  errorClass: 'pop-up__error-massage_hidden'
};
export const initialCards = [
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
  },
];
export const popups = document.querySelectorAll('.pop-up');

export const popUpImage = document.querySelector('.pop-up_type_image');
export const popUpPicture = popUpImage.querySelector('.pop-up__image');
export const popUpPictureText = popUpImage.querySelector('.pop-up__image-title');
export const popUpProfileEdit = document.querySelector('.pop-up_type_profile-edit');
export const popUpProfileEditOpenButton = document.querySelector('.profile__button_type_profile-edit');
export const formInputName = document.querySelector('.pop-up__edit_type_name');
export const formInputTitle = document.querySelector('.pop-up__edit_type_title');
export const popUpCardEdit = document.querySelector('.pop-up_type_card-edit');
export const popUpCardEditOpenButton = document.querySelector('.profile__button_type_card-edit');
export const inputCardName = popUpCardEdit.querySelector('.pop-up__edit_type_card-name');
export const inputCardLink = popUpCardEdit.querySelector('.pop-up__edit_type_card-link');

export const placesList =  document.querySelector('.places');
export const cardTemplateSelector = '.places__pattern';

//порофиль

export const cardForm = document.querySelector('#cardForm')
export const profileForm = document.querySelector('#profileForm')

export const inputName = document.querySelector('.profile__name');
export const inputTitle = document.querySelector('.profile__title');












