import './Register.css';
import React from 'react';
import { useFormWithValidation } from '../Validation/Validation';

import { TranslationContext } from '../../contexts/TranslationContext';

function Register(
  {
    // handleRegistrationSubmit,
    // apiError,
    // changeApiError,
    // blocked,
  }
) {
  const translation = React.useContext(TranslationContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // if (isValid) {
    //   handleRegistrationSubmit(values, resetForm);
    // }
  }

  // React.useEffect(() => {
  //   changeApiError('');
  // }, [changeApiError, values]);

  const apiError = 'Тестовая ошибка';
  return (
    <main className="register">
      <section className="register__container">
        <h1 className="form-title">{translation.registerTitle}</h1>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" className="form__label">
            {translation.nameLabel}
          </label>
          <input
            className="form__input"
            type="text"
            placeholder={translation.namePlaceholder}
            id="name"
            name="name"
            minLength="2"
            maxLength="20"
            pattern="[A-Za-zА-Яа-яЁё\s\-]+$"
            onChange={handleChange}
            title={translation.nameTitle}
            value={values.name || ''}
            required
            // disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.name}</p>
          <label htmlFor="email" className="form__label">
            {translation.emailLabel}
          </label>
          <input
            className="form__input"
            type="email"
            placeholder={translation.emailPlaceholder}
            id="email"
            name="email"
            pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
            onChange={handleChange}
            value={values.email || ''}
            required
            // disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.email}</p>
          <label htmlFor="password" className="form__label">
            {translation.passwordLabel}
          </label>
          <input
            className="form__input"
            type="password"
            placeholder={translation.passwordPlaceholder}
            id="password"
            name="password"
            minLength="7"
            onChange={handleChange}
            value={values.password || ''}
            required
            // disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.password}</p>
          <label htmlFor="confirm" className="form__label">
            {translation.confirmLabel}
          </label>
          <input
            className="form__input"
            type="password"
            placeholder={translation.confirmPlaceholder}
            id="confirm"
            name="confirm"
            minLength="7"
            onChange={handleChange}
            value={values.confirm || ''}
            required
            // disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.confirm}</p>
          <p className="api-error">{apiError}</p>
          <button
            type="submit"
            className="button"
            disabled={
              !isValid
              //  || apiError || blocked
            }
          >
            {translation.register}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
