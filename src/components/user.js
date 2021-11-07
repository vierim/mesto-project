import { elements } from './elements.js';
import { getUserInfo } from './api.js';

export const loadUserInfo = () => {
  return getUserInfo()
    .then(data => {
      return data;
    })
}

export const renderUserInfo = (name, job) => {
  elements.profileName.textContent = name;
  elements.profileProfession.textContent = job;
}

export const renderUserAvatar = (name, avatar) => {
  elements.avatarImage.src = avatar;
  elements.avatarImage.alt = `Аватар пользователя ${name}`;
}
