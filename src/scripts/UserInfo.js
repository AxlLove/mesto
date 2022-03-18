
export class UserInfo {
  constructor({userName, userDescription, userAvatar}){
    this._userName = document.querySelector(userName)
    this._userDescription = document.querySelector(userDescription)
    this._userAvatar = document.querySelector(userAvatar)
  }
  getUserInfo() {
    this._userInfo = {}
    this._userInfo.name = this._userName.textContent
    this._userInfo.title = this._userDescription.textContent

    return this._userInfo
}
  setUserInfo(name, title, avatar){
    this._userName.textContent = name
    this._userDescription.textContent = title
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
  setAvatar (avatar){
   this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
  setNameAndDescription (name, title) {
    this._userName.textContent = name
    this._userDescription.textContent = title
  }
}
