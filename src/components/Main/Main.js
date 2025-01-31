import './Main.css';
import imagePath from '../../images/main-image.jpg';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TranslationContext } from '../../contexts/TranslationContext';
import ContactsButtons from '../ContactsButtons/ContactsButtons';
import PagesButtons from '../PagesButtons/PagesButtons';

function Main({ width }) {
  const translation = React.useContext(TranslationContext);

  return (
    <main className="main">
      <h1 className="main__title">{translation.greeting}</h1>
      <div className="main__text-container">
        <p className="main__subtitle">{translation.subtitle}</p>
        <p className="main__text">{translation.text}</p>
        <p className="main__text">
          {translation.pages}
          <PagesButtons />
        </p>
        <p className="main__text">
          {translation.contacts}
          <ContactsButtons width={width} />
        </p>
        {width > 768 && (
          <a
            className="main__text main__link"
            href="mailto:sabinkaartist@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            sabinkaartist@gmail.com
          </a>
        )}
      </div>
      <img className="main__image" src={imagePath} alt="Мой портрет"></img>
    </main>
  );
}

export default Main;
