import './Profile.css';
import React from 'react';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import PasswordEdit from '../PasswordEdit/PasswordEdit';

// import { useFormWithValidation } from '../Validation/Validation';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TranslationContext } from '../../contexts/TranslationContext';

function Profile({
  onExit,
  //apiError,
  // changeApiError,
  //handleEditProfileSubmit,
  //blocked,
  //editSuccess,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const translation = React.useContext(TranslationContext);

  const [isEdited, setIsEdited] = React.useState('no');

  function openEditProfile() {
    setIsEdited('profile');
  }

  function openEditPassword() {
    setIsEdited('password');
  }

  function closeEdit() {
    setIsEdited('no');
  }

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="form-title">
          {translation.profileTitle}, {currentUser.name}!
          {/* {editSuccess && !isEdited
            ? `Изменения успешно сохранены !`
            : `Привет, ${currentUser.name}

       !`} */}
        </h1>
        {isEdited === 'profile' && <ProfileEdit closeEdit={closeEdit} />}
        {isEdited === 'password' && <PasswordEdit closeEdit={closeEdit} />}

        {isEdited === 'no' && (
          <div className="form">
            <div className="form__label profile__label profile__label_inedited">
              {translation.name}
              <span className="profile__input profile__input_inedited">
                {currentUser.name}
              </span>
            </div>
            <div className="form__label profile__label profile__label_inedited">
              E-mail
              <span className="profile__input profile__input_inedited">
                {currentUser.email}
              </span>
            </div>
            <div className="profile__options">
              <button className="profile__option" onClick={openEditProfile}>
                {translation.edit}
              </button>
              <button className="profile__option" onClick={openEditPassword}>
                {translation.changePassword}
              </button>
              <button
                className="profile__option profile__option_type_exit"
                onClick={onExit}
              >
                {translation.exit}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
