export class Card {
    constructor (data, cardTemplateSelector, previewPicture, handleDeleteCard, userId, handleLikeClick){
      this._name = data.name
      this._link = data.link
      this._likes = data.likes
      this._id = data._id
      this._userId = userId
      this._owner = data.owner._id
      this._template = document.querySelector(cardTemplateSelector).content
      this._previewPicture = previewPicture;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeClick = handleLikeClick;
    };
      deleteCard () {
        this._cardElement.remove();
        this._cardElement = null;
      };
    _likeCard () {
        this._likeCardButton.classList.add('places__like-button_active');
      };
     _unLikeCard () {
    this._likeCardButton.classList.remove('places__like-button_active');
  };

    _setEventListeners(){
        this._deleteCardButton.addEventListener('click',()=>{
          this._handleDeleteCard(this._id)
        });
        this._likeCardButton.addEventListener('click', ()=>{
          this._handleLikeClick(this._id);
        });
        this._placesImage.addEventListener('click', ()=>{
            this._previewPicture(this._name, this._link);
        })
    }
    isLiked (){
      const userLikedCard =  this._likes.find(user => user._id === this._userId)
      return userLikedCard
    }
    setLikes (newLikes){
      this._likes = newLikes
    const likeCount = this._cardElement.querySelector('.places__like-count')
      likeCount.textContent = this._likes.length;


      if (this.isLiked ()){
        this._likeCard()
      }else{
        this._unLikeCard()
      }
    }
    createCard (){
        this._cardElement = this._template.querySelector('.places__item').cloneNode(true);
        this._placesImage = this._cardElement.querySelector('.places__image');
        const placesName = this._cardElement.querySelector('.places__name');

        this._deleteCardButton = this._cardElement.querySelector('.places__delete-button');
        this._likeCardButton = this._cardElement.querySelector('.places__like-button');


        placesName.textContent = this._name;
        this._placesImage.src = this._link;
        this._placesImage.alt = this._name;
        this.setLikes(this._likes)
        this._setEventListeners();

        if (this._userId !== this._owner){
          this._deleteCardButton.style.display = "none";
        }


        return this._cardElement;
    };
}

