import '../Profile/Profile.css';

import React from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';

import { useFormWithValidation } from '../Validation/Validation';

function PasswordEdit({ closeEdit }) {
  const translation = React.useContext(TranslationContext);

  function handleSubmit(e) {
    e.preventDefault();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  function close() {
    closeEdit();
    resetForm();
  }

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const apiError = 'Тестовая ошибка';

  return (
    <form className="form" onSubmit={handleSubmit} noValidate name="password">
      <label className="form__label profile__label" htmlFor="oldPassword">
        {translation.oldPassword}
        <input
          className="profile__input"
          type="password"
          placeholder={translation.oldPasswordPlaceholder}
          id="oldPassword"
          name="oldPassword"
          minLength="7"
          title={translation.nameTitle}
          onChange={handleChange}
          value={values.oldPassword || ''}
          required
          // disabled={blocked}
          autoFocus
        ></input>
      </label>
      <p className="form__input-error profile__input-error">
        {errors.oldPassword}
      </p>
      <label className="form__label profile__label" htmlFor="newPassword">
        {translation.newPassword}
        <input
          className="profile__input"
          type="password"
          id="newPassword"
          name="newPassword"
          minLength="7"
          value={values.newPassword || ''}
          required
          onChange={handleChange}
          // disabled={blocked}
        ></input>
      </label>
      <p className="form__input-error profile__input-error">
        {errors.newPassword}
      </p>
      <p className="api-error profile__api-error"> {apiError}</p>
      <button
        className="button"
        type="submit"
        disabled={
          !isValid || errors.newPassword
          // || apiError || blocked
        }
      >
        {translation.save}
      </button>
      <button className="button" type="button" onClick={close}>
        {translation.cancel}
      </button>
    </form>
  );
}
export default PasswordEdit;
