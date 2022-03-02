import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popUpPicture = document.querySelector('.pop-up__image');
    this._popUpPictureText = document.querySelector('.pop-up__image-title');
  }
  openPopUp(name, link) {
    this._name = name;
    this._link = link;
    this._popUpPicture.src = this._link;
    this._popUpPictureText.textContent = this._name;
    this._popUpPicture.alt = this._name;

    super.openPopUp();
  };
};
