import { showError } from "./utils.js";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, api) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
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
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    document.title = name;
  }

  renderUserAvatar = ({ name, avatar }) => {
    this._avatarSelector.src = avatar;
    this._avatarSelector.alt = `Аватар пользователя ${name}`;
  };
}
