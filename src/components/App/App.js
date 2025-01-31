import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';

import {
  TranslationContext,
  translations,
} from '../../contexts/TranslationContext';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { data, admin, user } from '../../utils/constants';

function App() {
  const [lang, setLang] = React.useState('En');
  function setRus() {
    setLang('Ru');
  }
  function setEng() {
    setLang('En');
  }

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResizeWindow() {
      setTimeout(setWidth, 1000, window.innerWidth);
    }
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const currentUser = user;

  console.log(currentUser);

  return (
    <HelmetProvider>
      <TranslationContext.Provider value={translations[lang]}>
        <CurrentUserContext.Provider value={currentUser}>
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
                      width={width}
                      data={data}
                      lang={lang}
                      user={user}
                    />
                    <Main width={width} />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  currentUser ? (
                    <>
                      <Navigate to="/profile" replace />
                    </>
                  ) : (
                    <>
                      <Header
                        setRus={setRus}
                        setEng={setEng}
                        width={width}
                        data={data}
                        lang={lang}
                        user={''}
                      />
                      <Login />
                      <Footer width={width} />
                    </>
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  currentUser ? (
                    <>
                      <Navigate to="/profile" replace />
                    </>
                  ) : (
                    <>
                      <Header
                        setRus={setRus}
                        setEng={setEng}
                        width={width}
                        data={data}
                        lang={lang}
                        user={currentUser}
                      />
                      <Register />
                      <Footer width={width} />
                    </>
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  currentUser ? (
                    <>
                      <Header
                        user={currentUser}
                        data={data}
                        setRus={setRus}
                        setEng={setEng}
                        width={width}
                        lang={lang}
                        //  signOut={signOut}
                      />
                      <Profile

                      // onExit={signOut}
                      // handleEditProfileSubmit={handleEditProfileSubmit}
                      // apiError={profileError}
                      // changeApiError={changeProfileError}
                      // blocked={formsBlocked}
                      // editSuccess={editSuccess}
                      />
                      <Footer />
                    </>
                  ) : (
                    <>
                      <Navigate to="/signin" replace />
                    </>
                  )
                }
              />
            </Routes>
          </div>
        </CurrentUserContext.Provider>
      </TranslationContext.Provider>
    </HelmetProvider>
  );
}

export default App;
