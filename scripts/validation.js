const validConfig = { 
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__edit',
  errorSelector: '.pop-up__error-massage',
  submitButtonSelector: '.pop-up__save-edit-button',
  inactiveButtonClass: 'pop-up__save-edit-button_disabled',
  inputErrorClass: 'pop-up__edit_type_error',
  errorClass: 'pop-up__error-massage_hidden'};

function submitForm (event){
    event.preventDefault();
}
function showError(form, input, errorText, {inputErrorClass, errorClass}) {
  const errorContainer = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass)
  errorContainer.classList.remove(errorClass)
  errorContainer.textContent = errorText;
}
function hideError(form, input, {inputErrorClass, errorClass}) {
  const errorContainer = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass)
  errorContainer.classList.add(errorClass)
  errorContainer.textContent = '';
}
function toggleButton (form, {submitButtonSelector, inactiveButtonClass}){
  const formValid = form.checkValidity()
  if (!formValid){
    disableSubmitBtn(form, {submitButtonSelector, inactiveButtonClass})
  }else {
    enableSubmitBtn(form, {submitButtonSelector, inactiveButtonClass})
  }
}
function disableSubmitBtn (form, {submitButtonSelector, inactiveButtonClass}){
  const button = form.querySelector(submitButtonSelector)
  button.classList.add(inactiveButtonClass)
  button.setAttribute('disabled', '');
}

function enableSubmitBtn (form, {submitButtonSelector, inactiveButtonClass}){
  const button = form.querySelector(submitButtonSelector)
  button.classList.remove(inactiveButtonClass)
  button.removeAttribute('disabled');
}

function validateInput (form, input, clases) {
const isValid = input.validity.valid;
const errorText = input.validationMessage;
if (!isValid){
  showError(form, input, errorText, clases)
  } else {
  hideError(form, input, clases) 
};
toggleButton(form, clases);

};

function enableValidation ({formSelector, inputSelector, ...rest}){
  const forms = document.querySelectorAll(formSelector)
  forms.forEach((form) => {
      form.addEventListener('submit', submitForm);
      form.addEventListener('reset',()=>{
        disableSubmitBtn(form, rest);
      });
      const inputs = form.querySelectorAll(inputSelector);
      inputs.forEach((input) =>{
        input.addEventListener('input', ()=>{
            validateInput(form, input, rest)
        });
        const buttons = document.querySelectorAll('.profile__button')
        buttons.forEach((button) =>{
        button.addEventListener('click', ()=>{
           validateInput (form, input, rest) 
        if (input.value === ""){
          hideError(form, input, rest) 
        }
});
        })
      });
      toggleButton(form, rest);
  });
};

enableValidation(validConfig); 
