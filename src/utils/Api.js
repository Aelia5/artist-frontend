import React from 'react';
function Api() {
  const BASE_URL = 'http://localhost:3001/api';

  function register(data) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        if (res.status === 409) {
          return Promise.reject('Пользователь с таким email уже существует.');
        } else {
          return Promise.reject(
            'При регистрации пользователя произошла ошибка'
          );
        }
      }
    });
  }

  const verifyEmail = React.useCallback((data) => {
    return fetch(`${BASE_URL}/verify/${data.userId}/${data.token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 201) {
        return res.json();
      } else if (res.status === 409) {
        return Promise.reject('Регистрация уже подтверждена');
      } else {
        return Promise.reject('При регистрации пользователя произошла ошибка');
      }
    });
  }, []);

  function login(data) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject('Вы ввели неправильный логин или пароль');
      } else {
        return Promise.reject(
          'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
        );
      }
    });
  }

  const getUser = React.useCallback((token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject(
          'При авторизации произошла ошибка. Переданный токен некорректен.'
        );
      } else {
        return Promise.reject(
          'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
        );
      }
    });
  }, []);

  return { register, login, getUser, verifyEmail };
}

export default Api;
