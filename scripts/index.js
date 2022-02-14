import { FormValidator } from "./FormValidator.js";
import { validConfig,  initialCards, popups, cardTemplateSelector,popUpProfileEdit,
  popUpProfileEditOpenButton, imputName, imputTitle, formImputName,formImputTitle,
  popUpCardEdit, popUpCardEditOpenButton, placesList,inputCardName,inputCardLink,cardForm,
  profileForm,popUpPicture,popUpPictureText,popUpImage
} from "./constants.js";
import { Card } from "./Card.js";
import { openPopUp, closePopUp } from "./utils.js";



const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validConfig);




function previewPicture (name, link) {
  popUpPicture.src = link;
  popUpPictureText.textContent = name;
  popUpPicture.alt = name;

  openPopUp (popUpImage);
};

function createCard (cardData){
  const card = new Card (cardData, cardTemplateSelector, previewPicture)
  const cardElements = card.createCard()
  return cardElements;
}

// Функция добавления карточки в конец списка
function prependCard (cardData) {
  const card = createCard (cardData)
  placesList.prepend(card);
};

// Загружаем карточки при открыттии страницы
initialCards.forEach(prependCard);

// Слушатели кнопок профиля
popUpProfileEditOpenButton.addEventListener('click', ()=> {
  formImputName.value = imputName.textContent;
  formImputTitle.value = imputTitle.textContent;
  formValidators['profile-form'].resetValidation();
  openPopUp(popUpProfileEdit);
});

popUpProfileEdit.addEventListener('submit', (evt)=>{
  imputName.textContent = formImputName.value;
  imputTitle.textContent = formImputTitle.value;
  closePopUp (popUpProfileEdit);
});

//Слушатели кнопок карточек
popUpCardEditOpenButton.addEventListener('click', ()=> {
  cardForm.reset()
  formValidators['card-form'].resetValidation();
  openPopUp (popUpCardEdit);
});


popUpCardEdit.addEventListener('submit', (evt)=>{
  const obj = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  prependCard(obj);
  closePopUp(popUpCardEdit);
});

// Закрытие нажатием на крестик или оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
        closePopUp(popup)
      };
    });
 });

 //Валидируем формы
