import './Main.css';
import imagePath from '../../images/main-image.jpg';

import React from 'react';
import { TranslationContext } from '../../contexts/translationContext';

function Main() {
  const translation = React.useContext(TranslationContext);

  return (
    <main className="main">
      <h1 className="main__title">{translation.greeting}</h1>
      <div className="main__text-container">
        <p className="main__subtitle">{translation.subtitle}</p>
        <p className="main__text">{translation.text}</p>
      </div>
      <img className="main__image" src={imagePath} alt="Мой портрет"></img>
    </main>
  );
}

export default Main;
