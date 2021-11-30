export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this._user = null;
  }

  getUserInfo() {
    return this._user;
  }

  setUserInfo(user) {
    this._user = user;

    this._renderUserInfo(user);
    this.renderUserAvatar(user);
  }

  _renderUserInfo({ name, about }) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    document.title = name;
  }

  renderUserAvatar = ({ name, avatar }) => {
    this._avatarSelector.src = avatar;
    this._avatarSelector.alt = `Аватар пользователя ${name}`;
  };
}
