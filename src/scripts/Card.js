export class Card {
    constructor (data, cardTemplateSelector, previewPicture){
    this._name = data.name
    this._link = data.link
    this._template = document.querySelector(cardTemplateSelector).content
    this._previewPicture = previewPicture;
    };
    _deleteCard (evt) {
        evt.target.closest('.places__item').remove();
      };
    _likeCard () {
        this._likeCardButton.classList.toggle('places__like-button_active');
      };


    _setEventListeners(){
        this._deleteCardButton.addEventListener('click',(evt)=>{
            this._deleteCard(evt);
        });
        this._likeCardButton.addEventListener('click', ()=>{
            this._likeCard();
        });
        this._placesImage.addEventListener('click', ()=>{
            this._previewPicture(this._name, this._link);
        })
    }

    createCard (){
        this._cardElement = this._template.cloneNode(true);

        this._placesImage = this._cardElement.querySelector('.places__image');
        const placesName = this._cardElement.querySelector('.places__name');

        this._deleteCardButton = this._cardElement.querySelector('.places__delete-button');
        this._likeCardButton = this._cardElement.querySelector('.places__like-button');
      
      
        placesName.textContent = this._name;
        this._placesImage.src = this._link;
        this._placesImage.alt = this._name;
      
        this._setEventListeners();
      
        return this._cardElement;
    };
}

