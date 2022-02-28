export class FormValidator {
  constructor (settings, form){
    this._form = form;
    this._settings = settings;
    this._button = this._form.querySelector(settings.submitButtonSelector); ;
    this._inactiveButton = settings.inactiveButtonClass;
    this._inputList = this._form.querySelectorAll(settings.inputSelector);
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
   _submitForm (event){
    event.preventDefault();
}
  _showError(input, errorText) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.remove(this._errorClass);
    errorContainer.textContent = errorText;
  }

  _hideError(input) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass)
    errorContainer.classList.add(this._errorClass)
    errorContainer.textContent = '';
  }


  _toggleButton (){
    const formValid = this._form.checkValidity();
    if (!formValid){
      this._disableSubmitBtn();
    } else {
      this._enableSubmitBtn();
    };
  };
  _disableSubmitBtn (){
    this._button.classList.add(this._inactiveButton);
    this._button.setAttribute('disabled', '');
  };

  _enableSubmitBtn (){
    
    this._button.classList.remove(this._inactiveButton);
    this._button.removeAttribute('disabled');
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

  resetValidation() {
    this._toggleButton(); 
    this._inputList.forEach((inputElement) => {
    this._hideError(inputElement)
    });

  }

  enableValidation () {
    this._form.addEventListener('submit', (evt)=>{
      this._submitForm(evt);
    });
    this._form.addEventListener('reset', ()=>{
          this._disableSubmitBtn();
        });
    this._inputList.forEach((input) =>{
          input.addEventListener('input', ()=>{
              this._validateInput(input);
          });
      });
    this._toggleButton();
  };
};


