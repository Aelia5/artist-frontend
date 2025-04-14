import './Popup.css';
import React from 'react';
import { useRef } from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';

import { useFormWithValidation } from '../Validation/Validation';

function Popup({ user, closePopup, type }) {
  const translation = React.useContext(TranslationContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function close() {
    closePopup();
    resetForm();
  }

  const containerRef = useRef();

  React.useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!containerRef.current.contains(e.target)) {
        closePopup();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [closePopup]);

  function handleSubmit(e) {
    e.preventDefault();
    close();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  React.useEffect(() => {
    resetForm(
      user,
      {},

      false
    );
  }, [user, resetForm]);

  let apiError;
  if (!values.email && !values.phone) {
    apiError = translation.noContacts;
  }

  return (
    <div className="popup">
      <div className="popup__container" ref={containerRef}>
        <div className="popup__header">
          {type === 'letter' && (
            <h2 className="form-title popup__title">
              {translation.sendLetter}
            </h2>
          )}{' '}
          <button className="popup__close-button" onClick={closePopup}></button>
        </div>
        {
          (type = 'letter' && (
            <form className="popup__form" onSubmit={handleSubmit} noValidate>
              <div className="popup__contacts">
                <div className="popup__contact">
                  <label className="form__label popup__label" htmlFor="email">
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
                <div className="popup__contact">
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
          ))
        }
      </div>
    </div>
  );
}

export default Popup;
