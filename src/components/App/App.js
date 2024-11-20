import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

import LangSwitcher from '../LangSwitcher/LangSwitcher';

import {
  TranslationContext,
  translations,
} from '../../contexts/translationContext';

function App() {
  const [lang, setLang] = React.useState('en');
  function setRus() {
    setLang('ru');
  }
  function setEng() {
    setLang('en');
  }

  return (
    <TranslationContext.Provider value={translations[lang]}>
      <div className="App">
        <Helmet htmlAttributes={{ lang: lang }}>
          <meta name="description" content={translations[lang].title} />
          <meta name="keywords" content={translations[lang].keyWords} />
          <meta name="author" content={translations[lang].author} />
          <link rel="manifest" href={`./manifest-${lang}.json`} />
          <title>{translations[lang].title}</title>
        </Helmet>
        <header className="App-header">
          <LangSwitcher setRus={setRus} setEng={setEng} />
          <p>{translations[lang].greeting}.</p>
        </header>
      </div>
    </TranslationContext.Provider>
  );
}

export default App;
