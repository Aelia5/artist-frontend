import React from 'react';

export const TranslationContext = React.createContext();

export const translations = {
  en: {
    greeting: 'Hello World',
    title: 'Sabina Tari’s portfolio',
    keyWords:
      'Sabina Tari portfolio design painting graphic arts illustrations',
    author: 'Sabina Tari',
  },
  ru: {
    greeting: 'Привет, мир!',
    title: 'Портфолио Сабины Тари',
    keyWords: 'Сабина Тари портфолио дизайн живопись графика иллюстрации',
    author: 'Сабина Тари',
  },
};
