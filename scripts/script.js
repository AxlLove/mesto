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
  },
];
const popups = document.querySelectorAll('.pop-up');

//порофиль
const popUpProfileEdit = document.querySelector('.pop-up_type_profile-edit');
const popUpProfileEditOpenButton = document.querySelector('.profile__edit-button');
const popUpProfileEditCloseButton = popUpProfileEdit.querySelector('.pop-up__close-button');


const imputName = document.querySelector('.profile__name');
const imputTitle = document.querySelector('.profile__title');
const svaveEditButton = document.querySelector('.pop-up__save-edit-button');

const formImputName = document.querySelector('.pop-up__edit_type_name');
const formImputTitle = document.querySelector('.pop-up__edit_type_title');

//карты
const popUpCardEdit = document.querySelector('.pop-up_type_card-edit');
const popUpCardEditOpenButton = document.querySelector('.profile__add-button');
const popUpCardEditCloseButton = popUpCardEdit.querySelector('.pop-up__close-button');


const list =  document.querySelector('.places');
const placesPattern =  document.querySelector('.places__pattern').content;

const inputCardName = popUpCardEdit.querySelector('.pop-up__edit_type_card-name');
const inputCardLink = popUpCardEdit.querySelector('.pop-up__edit_type_card-link');

//попап картинки
const popUpImage = document.querySelector('.pop-up_type_image');
const popUpImageCloseButton = popUpImage.querySelector('.pop-up__close-button');
const popUpPicture = popUpImage.querySelector('.pop-up__image');
const popUpPictureText = popUpImage.querySelector('.pop-up__image-title');

function togglePopUp (popUp) {
  popUp.classList.toggle('pop-up_opened');
}
function closePopUp (popUp) {
  popUp.classList.remove('pop-up_opened');
}
function openPopUp (popUp) {
  popUp.classList.add('pop-up_opened');
}

function deleteCard (e) {
  e.target.closest('.places__item').remove();
}
function likeCard (e) {
  e.target.classList.toggle('places__like-button_active');
}


//создаем карточку
function createCard (cardData){
  const cardElement = placesPattern.cloneNode(true);
  const placesImage = cardElement.querySelector('.places__image');
  const placesName = cardElement.querySelector('.places__name');

  
  placesName.textContent = cardData.name;
  placesImage.src = `${cardData.link}`;
  placesImage.alt =cardData.name;

  const deleteCardButton = cardElement.querySelector('.places__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = cardElement.querySelector('.places__like-button');
  likeCardButton.addEventListener('click', likeCard);

 
  placesImage.addEventListener('click', (e)=>{
    if (e.target === e.currentTarget) {
      popUpPicture.src = placesImage.src;
      popUpPictureText.textContent = placesName.textContent;
      popUpPicture.alt = placesName.textContent;

      togglePopUp (popUpImage);
    }
  });
  
  return cardElement;
};

function prependCard (cardData) {
const cardElement = createCard (cardData);
list.prepend(cardElement);
}

// Загружаем карточки
initialCards.forEach(prependCard);
// слушатели на попап профиля

popUpProfileEditOpenButton.addEventListener('click', ()=> {
  formImputName.value = imputName.textContent;
  formImputTitle.value = imputTitle.textContent;
  togglePopUp (popUpProfileEdit);
});

popUpProfileEdit.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  imputName.textContent = formImputName.value;
  imputTitle.textContent = formImputTitle.value;
  togglePopUp (popUpProfileEdit);
});

//слушатели на попап карточк
popUpCardEditOpenButton.addEventListener('click', ()=> {
  inputCardName.value = "";
  inputCardLink.value = "";
  togglePopUp (popUpCardEdit);
});


popUpCardEdit.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const obj = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  prependCard(obj);
  togglePopUp(popUpCardEdit);
  inputCardName.value = "";
  inputCardLink.value = "";
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('pop-up_opened')) {
          closePopUp(popup);
        }
        if (evt.target.classList.contains('pop-up__close-button')) {
          closePopUp(popup);
        }
        document.addEventListener('keydown', (evt)=>{
          if(evt.key ==='Escape'){
            closePopUp(popup);
          };
        });
    });
});