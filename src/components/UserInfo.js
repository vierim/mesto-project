export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._name, about: this._about, avatar: this._avatar, _id: this._id };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;

    this._renderUserInfo();
    this._renderUserAvatar();
  }

  _renderUserInfo() {
    this._nameEl.textContent = this._name;
    this._aboutEl.textContent = this._about;
  }

  _renderUserAvatar = () => {
    this._avatarEl.src = this._avatar;
    this._avatarEl.alt = `Аватар пользователя ${this._name}`;
  };
}
