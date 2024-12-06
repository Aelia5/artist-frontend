import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';

import {
  TranslationContext,
  translations,
} from '../../contexts/translationContext';

import { data, admin, user } from '../../utils/constants';

function App() {
  const [lang, setLang] = React.useState('En');
  function setRus() {
    setLang('Ru');
  }
  function setEng() {
    setLang('En');
  }

  return (
    <HelmetProvider>
      <TranslationContext.Provider value={translations[lang]}>
        <div className="app">
          <Helmet htmlAttributes={{ lang: lang }}>
            <meta name="description" content={translations[lang].title} />
            <meta name="keywords" content={translations[lang].keyWords} />
            <meta name="author" content={translations[lang].author} />
            <link rel="manifest" href={`./manifest-${lang}.json`} />
            <title>{translations[lang].title}</title>
          </Helmet>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    setRus={setRus}
                    setEng={setEng}
                    data={data}
                    lang={lang}
                    user={user}
                  />
                  <Main />
                  {/* <Main />
                <Footer /> */}
                </>
              }
            />
          </Routes>
        </div>
      </TranslationContext.Provider>
    </HelmetProvider>
  );
}

export default App;
