const configAPI = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
  headers: {
    authorization: '27fae40c-b0f9-46c9-bf33-d2f2bfaeebe1',
    'Content-Type': 'application/json'
  }
}

export const getUserInfo = () => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    headers: configAPI.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

export const changeUserInfo = (name, job) => {

  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

export const editAvatar = (pic) => {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: pic
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

export const getCards = () => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    headers: configAPI.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

export const postCard = (title, url) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      name: title,
      link: url
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

export const deleteCard = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configAPI.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    });
}

// 5. Редактирование профиля
// 6. Добавление новой карточки
// 7. Отображение количества лайков карточки
// 8. Удаление карточки
// 9. Постановка и снятие лайка
// 10. Обновление аватара пользователя
// 11. Улучшенный UX всех форм

// 14. Дополнительно. Попап удаления карточки

// 1. Не забывайте проверять, всё ли в порядке с ответом. Для этого можно использовать res.ok или res.status:
// 2. Учитывайте случай, когда сервер вернул ошибку:
// 3. Обрабатывайте ошибки, которые попадают в catch. Если запрос не ушёл на сервер или тот не ответил, сработает блок catch. Обрабатывайте ошибку внутри этого блока. Если нет времени писать сложную логику, просто выведите ошибку в консоль:
// 4. Пользуйтесь вкладкой Network для просмотра запросов. При отправке запросов держите вкладку Network открытой. Отфильтруйте в ней XHR запросы. Это позволит оперативно следить, что приходит в ответе от сервера.

