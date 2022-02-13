function closePopUpPressEsc (evt){
    const popupActive = document.querySelector('.pop-up_opened')
    if(evt.key ==='Escape'){
      closePopUp (popupActive)
    };
  };
  
export function openPopUp (popUp) {
    popUp.classList.add('pop-up_opened');
    document.addEventListener('keydown', closePopUpPressEsc)
  };

 export function closePopUp (popUp) {
    popUp.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closePopUpPressEsc)
  };