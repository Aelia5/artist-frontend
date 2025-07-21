import './Picture.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TranslationContext } from '../../contexts/TranslationContext';

function Picture({
  picture,
  lang,
  section,
  user,
  openPopupLetter,
  openPopupDelete,
}) {
  const navigate = useNavigate();

  const translation = React.useContext(TranslationContext);

  const [liked, setLiked] = React.useState(
    picture.likes.some((id) => {
      return id === user._id;
    })
  );
  function toggleLike() {
    setLiked(!liked);
  }

  function sendLetter() {
    openPopupLetter(picture, 'picture');
  }

  function deletePicture() {
    openPopupDelete(picture, 'picture');
  }

  return (
    <li
      className={`picture ${
        picture.orientation === 'landscape' ? 'picture_landscape' : ''
      }`}
      id={`i${picture._id}`}
    >
      <div
        className={`picture__frame ${
          picture.orientation === 'landscape' ? 'picture__frame_landscape' : ''
        }`}
      >
        <img
          alt={picture[`name${lang}`]}
          src={picture.link}
          className="picture__image"
        />
      </div>

      <div
        className={`picture__label ${
          picture.orientation === 'landscape' ? 'picture__label_landscape' : ''
        }`}
      >
        <div className="picture__text">
          <p
            className={`picture__title ${
              picture[`name${lang}`].length > 20 && 'picture__title_type_long'
            }`}
          >
            {picture[`name${lang}`]}
          </p>
          <p
            className={`picture__info ${
              picture[`technique${lang}`].length > 25 &&
              'picture__info_type_long'
            }`}
          >
            {`${picture[`technique${lang}`]}. ${picture.created}. ${
              picture[`size${lang}`]
            }. ${
              section.nameEn === 'Design' && picture.ownerEn !== 'none'
                ? `${translation.owner}: ${picture[`owner${lang}`]}.`
                : ''
            } ${
              section.nameEn === 'For sale'
                ? `${picture[`price${lang === 'En' ? 'Eur' : 'Rub'}`]}\u00A0${
                    translation.currency
                  }.`
                : ''
            }`}{' '}
          </p>
        </div>
        <div className="picture__buttons">
          {user.admin ? (
            <>
              {' '}
              <button
                className="little-button little-button_type_edit picture__button"
                onClick={() => {
                  navigate(`/admin/edit/${picture._id}`, {
                    state: section.nameEn,
                  });
                }}
              ></button>
              <button
                className="little-button little-button_type_delete picture__button"
                onClick={deletePicture}
              ></button>
            </>
          ) : (
            <>
              {' '}
              <button
                className={`little-button ${
                  liked
                    ? 'little-button_type_unlike'
                    : 'little-button_type_like'
                } picture__button`}
                onClick={toggleLike}
              ></button>
              <button
                className="little-button little-button_type_mail picture__button"
                onClick={sendLetter}
                title={translation.sendLetter}
              ></button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Picture;
