import './Popup.css';
import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { TranslationContext } from '../../contexts/TranslationContext';

import { useFormWithValidation } from '../Validation/Validation';

function Popup({ user, closePopup, popupType, item }) {
  const navigate = useNavigate();

  const translation = React.useContext(TranslationContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const close = useCallback(() => {
    if (popupType === 'sent' || 'success' || 'failure') {
      closePopup();
      navigate('/', { replace: true });
    } else {
      closePopup();
      resetForm();
    }
  }, [closePopup, navigate, popupType, resetForm]);

  const containerRef = useRef();

  React.useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!containerRef.current.contains(e.target)) {
        if (popupType === 'sent' || 'success' || 'failure') {
          close();
        } else {
          closePopup();
        }
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [close, closePopup, popupType]);

  function handleSubmit(e) {
    e.preventDefault();
    close();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  React.useEffect(() => {
    if (popupType === 'letter') {
      resetForm(user, {}, false);
    } else if (popupType === 'edit') {
      resetForm(item.item, {}, false);
    }
  }, [user, item, popupType, resetForm]);

  let apiError;
  if (popupType === 'letter' && !values.email && !values.phone) {
    apiError = translation.noContacts;
  }

  let position;
  if (popupType === 'failure' || 'success' || 'repeat' || 'sent') {
    position = 'centered';
  }
  return (
    <div className="popup">
      <div
        className={`popup__container ${
          popupType === 'delete' && 'popup__container_type_delete'
        } ${position === 'centered' && 'popup__container_type_centered'} `}
        ref={containerRef}
      >
        <div className="popup__header">
          {popupType === 'letter' && (
            <h2 className="form-title popup__title">
              {translation.sendLetter}
            </h2>
          )}
          {popupType === 'sent' && (
            <h2 className="form-title popup__title">{translation.checkMail}</h2>
          )}
          {popupType === 'success' && (
            <h2 className="form-title popup__title">{translation.success}</h2>
          )}
          {popupType === 'failure' && (
            <h2 className="form-title popup__title">{translation.failure}</h2>
          )}
          {popupType === 'repeat' && (
            <h2 className="form-title popup__title">{translation.repeat}</h2>
          )}
          {popupType === 'delete' && (
            <h2 className="form-title popup__title">
              {item.itemType === 'picture' &&
                `Удаление картины "${item.item.nameRu}"`}
              {item.itemType === 'section' &&
                `Удаление раздела "${item.item.nameRu}"`}
              {item.itemType === 'series' &&
                `Удаление серии "${item.item.nameRu}"`}
            </h2>
          )}
          {popupType === 'edit' && (
            <h2 className="form-title popup__title">
              {' '}
              {item.itemType === 'section' &&
                `Редактирование раздела "${item.item.nameRu}"`}
              {item.itemType === 'series' &&
                `Редактирование серии "${item.item.nameRu}"`}
            </h2>
          )}
          <button className="popup__close-button" onClick={close}></button>
        </div>
        {popupType === 'letter' && (
          <form className="popup__form" onSubmit={handleSubmit} noValidate>
            <div className="popup__inputs">
              <div className="popup__input">
                <label className="form__label" htmlFor="email">
                  E-mail
                  <input
                    className="form__input"
                    type="email"
                    placeholder={translation.emailPlaceholder}
                    id="email"
                    name="email"
                    pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
                    value={values.email || ''}
                    onChange={handleChange}
                    // disabled={blocked}
                  ></input>
                </label>
                <p className="form__input-error profile__input-error">
                  {errors.email}
                </p>
              </div>
              <div className="popup__input">
                <label className="form__label" htmlFor="phone">
                  {translation.phoneLabel}
                  <input
                    className="form__input"
                    type="tel"
                    placeholder={translation.phonePlaceholder}
                    id="phone"
                    name="phone"
                    pattern="[0-9]+"
                    minLength="10"
                    maxLength="12"
                    value={values.phone || ''}
                    onChange={handleChange}
                    title={translation.phoneTitle}
                  ></input>
                </label>
                <p className="form__input-error profile__input-error">
                  {errors.phone}
                </p>
              </div>
            </div>
            <label className="form__label" htmlFor="letter">
              {translation.textLetter}
              <textarea
                className="form__input form__textarea"
                placeholder={translation.letterPlaceholder}
                id="letter"
                name="letter"
                value={values.letter || ''}
                onChange={handleChange}
                minLength="2"
                maxLength="5000"
                required
              ></textarea>
            </label>
            <p className="form__input-error profile__input-error">
              {errors.letter}
            </p>{' '}
            <p className="api-error"> {apiError}</p>
            <button
              className="button popup__button"
              type="submit"
              disabled={!isValid || apiError}
            >
              {translation.send}
            </button>
          </form>
        )}

        {popupType === 'sent' && (
          <p className="popup__text">{translation.checkMailExplanation}</p>
        )}

        {popupType === 'edit' && (
          <form className="popup__form" onSubmit={handleSubmit} noValidate>
            <div className="popup__inputs">
              <div className="popup__input">
                <label className="form__label" htmlFor="nameRu">
                  Русское название
                  <input
                    className="form__input"
                    type="text"
                    id="nameRu"
                    name="nameRu"
                    value={values.nameRu || ''}
                    minLength="2"
                    maxLength="100"
                    onChange={handleChange}
                    // disabled={blocked}
                  ></input>
                </label>
                <p className="form__input-error profile__input-error">
                  {errors.nameRu}
                </p>
              </div>
              <div className="popup__input">
                <label className="form__label" htmlFor="nameEn">
                  Английское название
                  <input
                    className="form__input"
                    type="text"
                    id="nameEn"
                    name="nameEn"
                    minLength="2"
                    maxLength="100"
                    value={values.nameEn || ''}
                    onChange={handleChange}
                  ></input>
                </label>
                <p className="form__input-error profile__input-error">
                  {errors.nameEn}
                </p>
              </div>
            </div>
            <p className="form__input-error profile__input-error">
              {errors.letter}
            </p>{' '}
            <p className="api-error"> {apiError}</p>
            <button
              className="button popup__button"
              type="submit"
              disabled={!isValid || apiError}
            >
              {translation.send}
            </button>
          </form>
        )}

        {popupType === 'delete' && (
          <>
            <p className="form-title popup__title">Вы уверены?</p>
            <div className="popup__buttons">
              {' '}
              <button className="button popup__button" onClick={close}>
                Удалить
              </button>
              <button className="button popup__button" onClick={close}>
                Отказаться
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
