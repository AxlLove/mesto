function submitForm (event){
    event.preventDefault();
}
function showError(input, errorContainer, errorText, {inputErrorClass, errorClass}) {
  input.classList.add(inputErrorClass)
  errorContainer.classList.remove(errorClass)
  errorContainer.textContent = errorText;
}
function hideError(input, errorContainer, {inputErrorClass, errorClass}) {
  input.classList.remove(inputErrorClass)
  errorContainer.classList.add(errorClass)
  errorContainer.textContent = '';
}
function toggleButton (form, {submitButtonSelector, inactiveButtonClass}){
  const button = form.querySelector(submitButtonSelector)
  const formValid = form.checkValidity()
  if (!formValid){
button.classList.add(inactiveButtonClass)
button.setAttribute('disabled', '');
  }else {
    button.classList.remove(inactiveButtonClass)
button.removeAttribute('disabled');
  }
}

function validateInput (form, input, clases) {
const errorContainer = form.querySelector(`#${input.id}-error`);

let isValid = input.validity.valid;
let errorText = input.validationMessage;
if (!isValid){
  showError(input, errorContainer, errorText, clases)
  } else {
  hideError(input, errorContainer, clases) 
}
toggleButton(form, clases);
}

function enableValidation ({formSelector, inputSelector, ...rest}){
  const forms = document.querySelectorAll(formSelector)
  forms.forEach((form) => {
      form.addEventListener('submit', submitForm);
      const inputs = form.querySelectorAll(inputSelector);
      inputs.forEach((input) =>{
        input.addEventListener('input', ()=>{
            validateInput(form, input, rest)
        });
      });
      toggleButton(form, rest);
  });
};

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__edit',
  errorSelector: '.pop-up__error-massage',
  submitButtonSelector: '.pop-up__save-edit-button',
  inactiveButtonClass: 'pop-up__save-edit-button_disabled',
  inputErrorClass: 'pop-up__edit_type_error',
  errorClass: 'pop-up__error-massage_hidden'
  }); 