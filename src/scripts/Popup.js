export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupActive = document.querySelector('.pop-up_opened');
    this.closeEsc = this._closePopUpPressEsc.bind(this)
  }
  _closePopUpPressEsc (evt){
    if(evt.key ==='Escape'){
      this.closePopUp (this._popupActive);
    };
  };

openPopUp () {
  this._popupSelector.classList.add('pop-up_opened');
    document.addEventListener('keydown', this.closeEsc)
  };

closePopUp () {
  this._popupSelector.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this.closeEsc)
  };
  setEventListeners(){
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
        this.closePopUp();
      };
    });
  };
};

