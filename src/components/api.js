export class Api {
  constructor(options) {
    this.options = options;
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

  changeUserInfo(name, job) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(pic) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: pic,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  postCard(title, url) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: title,
        link: url,
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
