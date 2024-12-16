import './Footer.css';
import React from 'react';
import { TranslationContext } from '../../contexts/translationContext';

import PagesButtons from '../PagesButtons/PagesButtons';
import ContactsButtons from '../ContactsButtons/ContactsButtons';

function Footer({ width }) {
  const translation = React.useContext(TranslationContext);

  return (
    <footer className="footer">
      <div className="footer__column">
        <p className="footer__item">© {translation.author}</p>
        <p className="footer__item">
          {translation.pages} <PagesButtons />
        </p>
      </div>
      <div className="footer__column">
        <p
          className={`footer__item ${
            (width <= 768) & (width > 500) && 'footer__item_type_nomail'
          }`}
        >
          {translation.contacts} <ContactsButtons width={width} />
        </p>
        {width > 768 && (
          <a
            className="footer__item footer__link"
            href="mailto:sabinkaartist@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            sabinkaartist@gmail.com
          </a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
