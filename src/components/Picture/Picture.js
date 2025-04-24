import './Picture.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TranslationContext } from '../../contexts/TranslationContext';

function Picture({ picture, lang, section, user, openPopupLetter, s }) {
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

  return (
    <li
      className={`picture ${
        picture.orientation === 'landscape' ? 'picture_landscape' : ''
      }`}
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
                className="picture__button picture__button_type_edit"
                onClick={() => {
                  navigate(`/admin/edit/${picture._id}`);
                }}
              ></button>
              <button className="picture__button picture__button_type_delete"></button>
            </>
          ) : (
            <>
              {' '}
              <button
                className={`picture__button ${
                  liked
                    ? 'picture__button_type_unlike'
                    : 'picture__button_type_like'
                }`}
                onClick={toggleLike}
              ></button>
              <button
                className="picture__button picture__button_type_mail"
                onClick={openPopupLetter}
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
