import { showError } from "./utils.js";

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
    this.nameSelector.textContent = name;
    this.aboutSelector.textContent = about;
  }

  renderUserAvatar = ({ name, avatar }) => {
    this.avatarSelector.src = avatar;
    this.avatarSelector.alt = `Аватар пользователя ${name}`;
  };
}
