const popUpOpenButton = document.querySelector('.profile__edit-button');
const popUpClosedButton = document.querySelector('.pop-up__close-button');
const popUp = document.querySelector('.pop-up');

let formImputName = document.querySelector('.pop-up__edit_name');
let formImputTitle = document.querySelector('.pop-up__edit_title');
let imputName = document.querySelector('.profile__name');
let imputTitle = document.querySelector('.profile__title');
const svaveEditButton = document.querySelector('.pop-up__save-edit-button');

function togglePopUp () {
  popUp.classList.toggle('pop-up_opened');
}
function removeFieldsAndOpenPopUp() {
  formImputName.value = imputName.textContent;
  formImputTitle.value = imputTitle.textContent;
  togglePopUp ();
}
function closePopUpAnyWhere (event) {
  if (event.target === event.currentTarget) {
  togglePopUp ()
  }
}
popUpOpenButton.addEventListener('click', removeFieldsAndOpenPopUp);
popUpClosedButton.addEventListener('click', togglePopUp);
popUp.addEventListener('mousedown', closePopUpAnyWhere);

function formSubmitHandler (evt) {
  evt.preventDefault();
  imputName.textContent = formImputName.value;
  imputTitle.textContent = formImputTitle.value;
  togglePopUp ()
}
popUp.addEventListener('submit', formSubmitHandler);

