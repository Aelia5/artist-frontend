import './Footer.css';
import React from 'react';
import { TranslationContext } from '../../contexts/translationContext';

function Footer() {
  const translation = React.useContext(TranslationContext);

  return (
    <footer className="footer">
      <div className="footer__column">
        <p className="footer__item">© {translation.author}</p>
      </div>
    </footer>
  );
}

export default Footer;
