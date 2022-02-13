import { FormValidator } from "./FormValidator.js";
import { validConfig,  initialCards, popups, cardTemplateSelector,popUpProfileEdit,
  popUpProfileEditOpenButton, imputName, imputTitle, formImputName,formImputTitle,
  popUpCardEdit, popUpCardEditOpenButton, placesList,inputCardName,inputCardLink,cardForm,
  profileForm
} from "./constants.js";
import { Card } from "./Card.js";
import { openPopUp, closePopUp } from "./utils.js";

const cardFormValidator = new FormValidator(validConfig, cardForm)
const profileFormValidator = new FormValidator(validConfig, profileForm)


// Функция добавления карточки в конец списка
function prependCard (cardData) {
  const card = new Card (cardData, cardTemplateSelector)
  const cardElements = card.createCard()
  placesList.prepend(cardElements);
};

// Загружаем карточки при открыттии страницы
initialCards.forEach(prependCard);

// Слушатели кнопок профиля
popUpProfileEditOpenButton.addEventListener('click', ()=> {
  formImputName.value = imputName.textContent;
  formImputTitle.value = imputTitle.textContent;
  openPopUp(popUpProfileEdit);
});

popUpProfileEdit.addEventListener('submit', (evt)=>{
  imputName.textContent = formImputName.value;
  imputTitle.textContent = formImputTitle.value;
  closePopUp (popUpProfileEdit);
});

//Слушатели кнопок карточек
popUpCardEditOpenButton.addEventListener('click', ()=> {
  openPopUp (popUpCardEdit);
  cardForm.reset()
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
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
        closePopUp(popup)
      };
    });
 });

 //Валидируем формы
 cardFormValidator.enableValidation()
 profileFormValidator.enableValidation()