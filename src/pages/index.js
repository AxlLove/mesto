import './index.css';
import { FormValidator } from "../scripts/FormValidator";
import { validConfig, cardTemplateSelector,popUpProfileEdit,
  popUpProfileEditOpenButton, formInputName,formInputTitle,
  popUpCardEdit, popUpCardEditOpenButton, placesList,popUpImage,deleteConfirmPopup
   , popUpAvatarEdit, popupAvatarOpenButton
} from "../scripts/constants.js";
import { Card } from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import {UserInfo} from "../scripts/UserInfo.js";
import {PopupWithImage} from "../scripts/PopupWithImage.js";
import {PopupWithForm} from "../scripts/PopupWithForm.js";
import  {api} from "../scripts/Api.js";
import {PopupWithConfirm} from "../scripts/PopupWithConfirm.js";

let userId

const pr1 = api.getProfile()
const pr2 = api.getInitialCards()
const promises = [pr1, pr2]
Promise.all(promises).then(([res1, res2])=> {
  userInfo.setUserInfo(res1.name, res1.about, res1.avatar);
  userId = res1._id;
  res2.reverse().forEach(data =>{
    section.addItem(data);
})})
    .catch(console.log)

const formValidators = {}
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

const image = new PopupWithImage(popUpImage);

const section = new Section ({item: [], renderer: (cardData)=>{
    const card = new Card (
      cardData,
      cardTemplateSelector,
      (name, link)=>{
      image.openPopUp(name, link);
    },
      (id)=>{
        confirmDelete.openPopUp();
        confirmDelete.addSubmitHandler(()=>{
          api.deleteCard(id).then(res => {
            card.deleteCard()
            confirmDelete.closePopUp()
          })
            .catch(console.log);
        })
    },
    userId,
    (id)=>{
      if(card.isLiked()){
          api.deleteLike(id).then(res=>{
            card.setLikes(res.likes);
          })
            .catch(console.log)
      }else{
          api.addLike(id).then(res=>{
           card.setLikes(res.likes);
        })
            .catch(console.log)
      }
    });
    const cardElements = card.createCard();
    return cardElements;
  }}, placesList);

const popupCard = new PopupWithForm({popupSelector: popUpCardEdit, formSubmit:(element)=>{
  const {name, link} = element;
  popupCard.renderLoading(true);
    api.addCard(name, link).then(res=>{
      section.addItem(res);
      popupCard.closePopUp();
    })
      .catch(console.log)
      .finally(()=>{
      popupCard.renderLoading(false);
  })
  }})

const userInfo = new UserInfo ({userName: '.profile__name', userDescription: '.profile__title', userAvatar:'.profile__image'});

const popupProfile = new PopupWithForm({popupSelector: popUpProfileEdit, formSubmit:(element)=>{
    const {name, title} = element;
    popupProfile.renderLoading(true);
    api.editProfile(name, title).then(res => {
      userInfo.setNameAndDescription(name, title);
      popupProfile.closePopUp();
    })
      .catch(console.log)
    .finally(()=>{
      popupProfile.renderLoading(false);
  })
  }})


const confirmDelete = new PopupWithConfirm ({popupSelector: deleteConfirmPopup})

const popupAvatar = new PopupWithForm ({popupSelector: popUpAvatarEdit, formSubmit:(element)=>{
    const {link} = element
    popupAvatar.renderLoading(true)
    api.editAvatar(link)
      .then(res => {
        userInfo.setAvatar(res.avatar)
        popupAvatar.closePopUp();
    })
      .catch(console.log)
      .finally(()=>{
        popupAvatar.renderLoading(false)
    })
}})


confirmDelete.setEventListeners();
image.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();

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

popupAvatarOpenButton.addEventListener('click', ()=> {
  formValidators['avatar-form'].resetValidation();
  popupAvatar.openPopUp()
});

