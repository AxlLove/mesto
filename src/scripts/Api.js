class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile () {
    return  fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
     .then(res => this._getResponseData(res))
  }

  getInitialCards() {
    return  fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }
  editProfile(name, about) {
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
        })
      })
      .then(res => this._getResponseData(res))
  }
  addCard(name, link) {
    return  fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }
  deleteCard(id) {
    return  fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }
  deleteLike(id) {
    return  fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }
  addLike(id) {
    return  fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }

  editAvatar(avatar) {
    return  fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => this._getResponseData(res))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '4bcf3dfa-8207-4148-a935-71cf9e8da368',
    'Content-Type': 'application/json'
  }
});
