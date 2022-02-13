export class FormValidator {
  constructor (settings, form){
    this._form = form;
    this._settings = settings;
  }
   _submitForm (event){
    event.preventDefault();
}
  _showError(input, errorText) {
    const {inputErrorClass, errorClass} = this._settings
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass)
    errorContainer.classList.remove(errorClass)
    errorContainer.textContent = errorText;
  }

  _hideError(input) {
    const {inputErrorClass, errorClass} = this._settings
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass)
    errorContainer.classList.add(errorClass)
    errorContainer.textContent = '';
  }


  _toggleButton (){
    const formValid = this._form.checkValidity();
    if (!formValid){
      this._disableSubmitBtn();
    }else {
      this._enableSubmitBtn();
    }
  }
  _disableSubmitBtn (){
    const {submitButtonSelector, inactiveButtonClass} = this._settings;
    const button = this._form.querySelector(submitButtonSelector);
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', '');
  };

  _enableSubmitBtn (){
    const {submitButtonSelector, inactiveButtonClass} = this._settings;
    const button = this._form.querySelector(submitButtonSelector);
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  };

  _validateInput (input) {
    const isValid = input.validity.valid;
    const errorText = input.validationMessage;
    if (!isValid){
      this._showError(input, errorText);
    } else {
      this._hideError(input);
    };
   this._toggleButton();
  };

  enableValidation () {
    const {inputSelector, popupOpenButtonSelector} = this._settings;
    this._form.addEventListener('submit', (evt)=>{
      this._submitForm(evt);
    });
    this._form.addEventListener('reset', ()=>{
          this._disableSubmitBtn();
        });
        const inputs = this._form.querySelectorAll(inputSelector);
        inputs.forEach((input) =>{
          input.addEventListener('input', ()=>{
              this._validateInput(input);
          });
          const buttons = document.querySelectorAll(popupOpenButtonSelector)
          buttons.forEach((button) =>{
          button.addEventListener('click', ()=>{
             this._validateInput (input)
            if (input.value === ""){
              this._hideError(input)
            }
          });
        })
      });
    this._toggleButton();
  };
};


