import './Login.css';
import React from 'react';
import { useFormWithValidation } from '../Validation/Validation';

function Login() {
  // { handleLoginSubmit, apiError, changeApiError, blocked }
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

  const apiError = 'Тестовая ошибка';

  return (
    <main className="login">
      <section className="login__container">
        <h1 className="form-title">Рады видеть!</h1>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            className="form__input"
            type="email"
            placeholder="Введите вашу почту"
            id="email"
            name="email"
            pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
            title="Введите корректный email"
            onChange={handleChange}
            value={values.email || ''}
            required
            // disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.email}</p>
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            className="form__input form__input_invalid"
            type="password"
            placeholder="Введите ваш пароль"
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
            className="login__button button"
            // disabled={!isValid || apiError || blocked}
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
