import '../pages/index.css';
import { FormValidator } from "./FormValidator.js";
import { validConfig,  initialCards,  cardTemplateSelector,popUpProfileEdit,
  popUpProfileEditOpenButton, formInputName,formInputTitle,
  popUpCardEdit, popUpCardEditOpenButton, placesList,popUpImage
} from "./constants.js";
import { Card } from "./Card.js";
import Section from "./Section.js";
import {UserInfo} from "./UserInfo.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";


const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validConfig);

const section = new Section ({item: initialCards, renderer: (cardData)=>{
    const card = new Card (cardData, cardTemplateSelector, (name, link)=>{
      const image = new PopupWithImage(popUpImage, name, link);
      image.openPopUp();
      image.setEventListeners();
    })
    const cardElements = card.createCard();
    return cardElements;
  }}, placesList);

section.loadCards();


const popupCard = new PopupWithForm({popupSelector: popUpCardEdit, formSubmit:(element)=>{
    section.addItem(element);
  }})
popupCard.setEventListeners();


const userInfo = new UserInfo ({userName: '.profile__name', userDescription: '.profile__title'});

const popupProfile = new PopupWithForm({popupSelector: popUpProfileEdit, formSubmit:(element)=>{
    userInfo.setUserInfo(element);
  }})
popupProfile.setEventListeners();

popUpProfileEditOpenButton.addEventListener('click', ()=> {
  const info = userInfo.getUserInfo();
  formInputName.value = info.name;
  formInputTitle.value = info.title;
  formValidators['profile-form'].resetValidation();
  popupProfile.openPopUp();
});

popUpCardEditOpenButton.addEventListener('click', ()=> {
  formValidators['card-form'].resetValidation();
  popupCard.openPopUp();
});

