import {Popup} from "./Popup.js";
export class PopupWithConfirm extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
  }
  setEventListeners() {
    this._popupSelector.addEventListener('submit', (e)=>{
      e.preventDefault()
      this._formSubmit();
    })
    super.setEventListeners();
  };
  addSubmitHandler (newFormSubmit){
    this._formSubmit = newFormSubmit
  }
}

