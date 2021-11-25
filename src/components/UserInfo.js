import { showError } from "./utils.js";

export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, api) {
    this.nameSelector = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
    this._api = api;
    this.user = null;
  }

  getUserInfo() {
    if (!this.user) {
      return this._api
        .getUserInfo()
        .then((user) => {
          this.user = user;

          this._renderUserInfo(user);
          this.renderUserAvatar(user);

          return user;
        })
        .catch((err) => showError(err));
    }

    return this.user;
  }

  setUserInfo(user) {
    return this._api
      .changeUserInfo(user)
      .then((res) => {
        this._renderUserInfo(res);
        this.user = res;
      })
      .catch((err) => showError(err));
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
