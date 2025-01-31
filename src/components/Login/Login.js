import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '../Validation/Validation';
import { TranslationContext } from '../../contexts/TranslationContext';

function Login() {
  // { handleLoginSubmit, apiError, changeApiError, blocked }

  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // if (isValid) {
    //   handleLoginSubmit(values, resetForm);
    // }
  }

  // React.useEffect(() => {
  //   changeApiError('');
  // }, [changeApiError, values]);

  const translation = React.useContext(TranslationContext);

  const apiError = 'Тестовая ошибка';

  return (
    <main className="login">
      <section className="login__container">
        <h1 className="form-title">{translation.loginTitle}!</h1>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="form__label">
            E-mail
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
            {translation.passwordTitle}
          </label>
          <input
            className="form__input form__input_invalid"
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
          <p className="api-error login__api-error">{apiError}</p>
          <button
            className="button login__button "
            disabled={
              !isValid
              //   || apiError || blocked
            }
            type="submit"
          >
            {translation.login}
          </button>
          <button
            className="button login__button"
            onClick={() => {
              navigate('/signup');
            }}
            type="button"
            disabled={isValid}
          >
            {translation.register}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
