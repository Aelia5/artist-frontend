import React from 'react';

export const TranslationContext = React.createContext();

export const translations = {
  En: {
    title: 'Sabina Tari’s portfolio',
    keyWords:
      'Sabina Tari portfolio design painting graphic arts illustrations',
    author: 'Sabina Tari',
    greeting: 'Welcome!',
    subtitle: 'My name is Sabina.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum tristique libero, at interdum risus pellentesque eget. Phasellus mi erat, finibus nec erat vel, tincidunt ornare sapien. Cras erat odio, iaculis in iaculis ut, ornare ut risus. Integer dictum dui lectus, sit amet bibendum nunc aliquam in. Nullam auctor diam nec urna pulvinar vehicula. Praesent ornare ligula ac sem sagittis tincidunt. Fusce gravida nisl pharetra risus consectetur, eu tincidunt augue sollicitudin. Aenean semper quam id volutpat lacinia. Suspendisse vel turpis id justo tincidunt tristique. Duis sit amet libero sit amet urna dictum tincidunt.',

    contacts: 'My contacts:',
    pages: 'My pages:',
    registerTitle: 'Welcome',
    namePlaceholder: 'Input your name',
    emailPlaceholder: 'Input your email',
    passwordPlaceholder: 'Input your password',
    confirmPlaceholder: 'Repeat your password',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    passwordLabel: 'Your password',
    confirmLabel: 'Password confirmation',
    register: 'Register',
    nameTitle: 'Only Cyrillic, Latin, hyphens and spaces',
    confirmError: 'The passwords do not match.',
  },
  Ru: {
    title: 'Портфолио Сабины Тари',
    keyWords: 'Сабина Тари портфолио дизайн живопись графика иллюстрации',
    author: 'Сабина Тари',
    greeting: 'Добро пожаловать!',
    subtitle: 'Меня зовут Сабина.',
    text: 'Организации, требуют соображения также интересный таким идейные высшего показывает, количественный же позволяет и количественный и таким способствует в дальнейших соответствующий же постоянный равным заданий представляет развития. Количественный новая играет соответствующий повседневная роль оценить развития. Значение собой порядка, условий кадров отношении показывает, образом новая порядка, активизации. Равным активизации. Идейные играет в а в собой что таким формировании задач. Выполнять в организации а требуют таким проверки деятельности позволяет важные модель высшего соображения также эксперимент а соображения сфера модель направлений административных рост рост требуют представляет заданий кадров задача показывает, модель соответствующий особенности идейные нашей способствует в позиций, играет интересный роль отношении формировании деятельност.',
    contacts: 'Мои контакты:',
    pages: 'Мои страницы:',
    registerTitle: 'Добро пожаловать',
    namePlaceholder: 'Введите ваше имя',
    emailPlaceholder: 'Введите вашу почту',
    passwordPlaceholder: 'Введите ваш пароль',
    confirmPlaceholder: 'Повторите ваш пароль',
    nameLabel: 'Ваше имя',
    emailLabel: 'Ваша электронная почта',
    passwordLabel: 'Ваш пароль',
    confirmLabel: 'Подтверждение пароля',
    register: 'Зарегистрироваться',
    nameTitle: 'Только кириллица, латиница, дефисы и пробелы',
    confirmError: 'Введённые пароли не совпадают',
  },
};
