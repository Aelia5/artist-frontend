import './Picture.css';
import React from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';

function Picture({ picture, lang, section, user }) {
  const translation = React.useContext(TranslationContext);

  const [liked, setLiked] = React.useState(
    picture.likes.some((id) => {
      return id === user._id;
    })
  );
  function toggleLike() {
    setLiked(!liked);
  }

  console.log(user.admin);
  return (
    <li className={`picture ${picture.landscape ? 'picture_landscape' : ''}`}>
      <div
        className={`picture__frame ${
          picture.landscape ? 'picture__frame_landscape' : ''
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
          picture.landscape ? 'picture__label_landscape' : ''
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
              <button className="picture__button picture__button_type_edit"></button>
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
              <button className="picture__button picture__button_type_mail"></button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Picture;
