import '../Profile/Profile.css';

import React from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { useFormWithValidation } from '../Validation/Validation';

function ProfileEdit({ closeEdit }) {
  const translation = React.useContext(TranslationContext);
  const currentUser = React.useContext(CurrentUserContext);

  const [isProfileNew, setIsProfileNew] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function close() {
    closeEdit();
    resetForm();
  }

  React.useEffect(() => {
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setIsProfileNew(true);
    } else setIsProfileNew(false);
  }, [values, currentUser]);

  React.useEffect(() => {
    resetForm(
      currentUser,
      {},

      false
    );
  }, [currentUser, resetForm]);

  const apiError = 'Тестовая ошибка';

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label className="form__label profile__label" htmlFor="name">
        {translation.name}
        <input
          className="profile__input"
          type="text"
          placeholder={translation.namePlaceholder}
          id="name"
          name="name"
          value={values.name}
          minLength="2"
          maxLength="20"
          pattern="[A-Za-zА-Яа-яЁё\s\-]+$"
          title={translation.nameTitle}
          onChange={handleChange}
          required
          // disabled={blocked}
          autoFocus
        ></input>
      </label>
      <p className="form__input-error profile__input-error">
        {isProfileNew ? errors.name : translation.newName}
      </p>
      <label className="form__label profile__label" htmlFor="email">
        E-mail
        <input
          className="profile__input"
          type="email"
          placeholder={translation.emailPlaceholder}
          id="email"
          name="email"
          pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
          value={values.email}
          required
          onChange={handleChange}
          // disabled={blocked}
        ></input>
      </label>
      <p className="form__input-error profile__input-error">
        {isProfileNew ? errors.email : translation.newEmail}
      </p>
      <p className="api-error profile__api-error"> {apiError}</p>
      <button
        className="button"
        type="submit"
        disabled={
          !isValid || !isProfileNew
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

export default ProfileEdit;
