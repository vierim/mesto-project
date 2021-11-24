export class Api {
  constructor(options) {
    this.options = options;
    this.changeUserInfo = this.changeUserInfo.bind(this);
    this.editAvatar = this.editAvatar.bind(this);
    this.postCard = this.postCard.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  postCard({ name, link }) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }
}
