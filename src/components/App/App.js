import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Section from '../Section/Section';
import Popup from '../Popup/Popup';
import FormPicture from '../FormPicture/FormPicture';
import AdminPanel from '../AdminPanel/AdminPanel';
import Api from '../../utils/Api';
import EmailVerification from '../EmailVerification/EmailVerification.js';

import { data } from '../../utils/constants.js';

import {
  TranslationContext,
  translations,
} from '../../contexts/TranslationContext';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const { register, login, getUser, verifyEmail } = Api();

  const [lang, setLang] = React.useState('En');
  function setRus() {
    setLang('Ru');
  }
  function setEng() {
    setLang('En');
  }
  //Стейты

  const [currentUser, setCurrentUser] = React.useState({});
  const updateUser = React.useCallback((data) => {
    setCurrentUser(data);
  }, []);

  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem('loggedIn')) || false
  );

  const [registerError, setRegisterError] = React.useState('');
  const changeRegisterError = React.useCallback((errorMessage) => {
    setRegisterError(errorMessage);
  }, []);

  const [formsBlocked, setFormsBlocked] = React.useState(false);

  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupType, setPopupType] = React.useState('');
  const [itemToHandle, setItemToHandle] = React.useState({});

  const [width, setWidth] = React.useState(window.innerWidth);

  // Управление попапами

  function openPopupLetter(picture) {
    setPopupOpen(true);
    setItemToHandle({ item: picture, itemType: 'picture' });

    setPopupType('letter');
  }

  function openPopupSent() {
    setPopupOpen(true);
    setPopupType('sent');
  }

  const openPopupSuccess = React.useCallback(() => {
    setPopupOpen(true);
    setPopupType('success');
  }, []);

  const openPopupFailure = React.useCallback(() => {
    setPopupOpen(true);
    setPopupType('failure');
  }, []);
  const openPopupRepeat = React.useCallback(() => {
    setPopupOpen(true);
    setPopupType('repeat');
  }, []);

  function openPopupDelete(item, itemType) {
    setPopupOpen(true);
    setItemToHandle({ item: item, itemType: itemType });
    setPopupType('delete');
  }

  function openPopupEdit(item, itemType) {
    setPopupOpen(true);
    setItemToHandle({ item: item, itemType: itemType });
    setPopupType('edit');
  }

  function closePopup() {
    setPopupOpen(false);
    setPopupType('');
  }

  //Функции управления профилем

  function authorize(token, resetForm, nav) {
    localStorage.setItem('token', token);
    getUser(token)
      .then((res) => {
        return res;
      })
      .then((userData) => {
        resetForm();
        setCurrentUser(userData);
        setLoggedIn(true);

        nav && navigate('/', { replace: true });
      });
  }

  function handleRegistrationSubmit(data, resetForm) {
    setFormsBlocked(true);
    register(data)
      .then(() => {
        openPopupSent();
        return login(data);
      })
      .then((res) => {
        authorize(res.token, resetForm, false);
      })
      .catch((err) => {
        setRegisterError(err);
      })
      .finally(() => {
        setFormsBlocked(false);
      });
  }

  //Исправить верстку попапа
  //Сделать разные варианты сообщений о неудаче
  //Проверить успешное подтверждение

  const signOut = React.useCallback(() => {
    const keysToRemove = ['token', 'loggedIn'];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    setCurrentUser({});
    setLoggedIn(false);

    navigate('/', { replace: true });
  }, [navigate]);

  // Эффекты

  React.useEffect(() => {
    function handleResizeWindow() {
      setTimeout(setWidth, 1000, window.innerWidth);
    }
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token)
        .then((res) => {
          return res;
        })
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch(() => {
          signOut();
        });
    }
  }, [getUser, signOut]);

  React.useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

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
              <link rel="manifest" href={`/manifest-${lang}.json`} />
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
                      user={currentUser}
                      loggedIn={loggedIn}
                    />
                    <Main width={width} />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  loggedIn ? (
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
                        loggedIn={loggedIn}
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
                  loggedIn && !popupOpen ? (
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
                        loggedIn={loggedIn}
                      />
                      <Register
                        apiError={registerError}
                        changeApiError={changeRegisterError}
                        handleRegistrationSubmit={handleRegistrationSubmit}
                        blocked={formsBlocked}
                      />
                      <Footer width={width} />
                      {popupOpen && (
                        <Popup
                          user={currentUser}
                          closePopup={closePopup}
                          popupType={popupType}
                        />
                      )}
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
                        loggedIn={loggedIn}
                        signOut={signOut}
                      />
                      <Profile
                        onExit={signOut}
                        // handleEditProfileSubmit={handleEditProfileSubmit}
                        // apiError={profileError}
                        // changeApiError={changeProfileError}
                        // blocked={formsBlocked}
                        // editSuccess={editSuccess}
                      />
                      <Footer width={width} />
                    </>
                  ) : (
                    <>
                      <Navigate to="/signin" replace />
                    </>
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  currentUser.admin ? (
                    <>
                      <Header
                        user={currentUser}
                        data={data}
                        setRus={setRus}
                        setEng={setEng}
                        width={width}
                        lang={lang}
                        loggedIn={loggedIn}
                        //  signOut={signOut}
                      />
                      <AdminPanel
                        sections={data.sections}
                        series={data.series}
                      />
                    </>
                  ) : (
                    <>
                      <Navigate to="/" replace />
                    </>
                  )
                }
              />
              <Route
                path="/verify/:userId/:token"
                element={
                  <>
                    <EmailVerification
                      verifyEmail={verifyEmail}
                      updateUser={updateUser}
                      openPopupSuccess={openPopupSuccess}
                      openPopupFailure={openPopupFailure}
                      openPopupRepeat={openPopupRepeat}
                      popupOpen={popupOpen}
                    />
                    {popupOpen && (
                      <Popup
                        user={currentUser}
                        closePopup={closePopup}
                        popupType={popupType}
                      />
                    )}
                  </>
                }
              />
              {data.sections.map((section) => (
                <Route
                  path={`/${section.nameEn}`}
                  key={section._id}
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
                          loggedIn={loggedIn}
                          //  signOut={signOut}
                        />
                        <Section
                          section={section}
                          lang={lang}
                          data={data}
                          user={currentUser}
                          openPopupLetter={openPopupLetter}
                          openPopupDelete={openPopupDelete}
                          openPopupEdit={openPopupEdit}
                        />
                        <Footer width={width} />
                        {popupOpen && (
                          <Popup
                            user={currentUser}
                            closePopup={closePopup}
                            popupType={popupType}
                            item={itemToHandle}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Navigate to="/signin" replace />
                      </>
                    )
                  }
                />
              ))}
              {data.pictures.map((picture) => (
                <Route
                  path={`/admin/edit/${picture._id}`}
                  key={picture._id}
                  element={
                    currentUser.admin ? (
                      <>
                        <Header
                          user={currentUser}
                          data={data}
                          setRus={setRus}
                          setEng={setEng}
                          width={width}
                          lang={lang}
                          loggedIn={loggedIn}
                          //  signOut={signOut}
                        />
                        <FormPicture
                          picture={picture}
                          sections={data.sections}
                          series={data.series}
                        />
                      </>
                    ) : (
                      <>
                        <Navigate to="/" replace />
                      </>
                    )
                  }
                />
              ))}
            </Routes>
          </div>
        </CurrentUserContext.Provider>
      </TranslationContext.Provider>
    </HelmetProvider>
  );
}

export default App;
