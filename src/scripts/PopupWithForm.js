import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = popupSelector.querySelector('.pop-up__form');
  }
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.pop-up__edit');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;

  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', ()=>{
      const values = this._getInputValues();
      this._formSubmit(values);
      this.closePopUp();
    })
    super.setEventListeners();
  };
  closePopUp() {
    this._form.reset();
    super.closePopUp();
  }
}
