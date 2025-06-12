import './FormPicture.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useFormWithValidation } from '../Validation/Validation';

function FormPicture({ picture, sections, series, close }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { values, handleChange, handleCheck, errors, isValid, resetForm } =
    useFormWithValidation();

  React.useEffect(() => {
    resetForm(picture, {}, false);
  }, [resetForm, picture]);

  function handleSubmit(e) {
    e.preventDefault();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  function handleReject() {
    if (picture) {
      navigate(`/${location.state}#i${picture._id}`);
    } else {
      close();
    }
  }

  let apiError;

  return (
    <div className="form-picture">
      {picture && (
        <h2 className="form-title form-picture__title">
          Редактирование картины "{picture.nameRu}"
        </h2>
      )}

      <form className="form-picture__form" onSubmit={handleSubmit} noValidate>
        {!picture && (
          <>
            <div className="form-picture__input form-picture__input_type_link">
              <label className="form__label" htmlFor="link">
                Ссылка на картину
                <input
                  className="form__input"
                  type="url"
                  id="link"
                  name="link"
                  value={values.link || ''}
                  onChange={handleChange}
                  required
                  // disabled={blocked}
                ></input>
              </label>
              <p className="form__input-error profile__input-error">
                {errors.link}
              </p>
            </div>
          </>
        )}
        <div className="form-picture__input">
          <label className="form__label" htmlFor="nameRu">
            Название картины
            <input
              className="form__input"
              type="text"
              id="nameRu"
              name="nameRu"
              value={values.nameRu || ''}
              onChange={handleChange}
              required
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.nameRu}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="nameEn">
            Picture title
            <input
              className="form__input"
              type="text"
              id="nameEn"
              name="nameEn"
              value={values.nameEn || ''}
              onChange={handleChange}
              required
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.nameEn}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="created">
            Год создания
            <input
              className="form__input"
              type="text"
              id="created"
              name="created"
              value={values.created || ''}
              pattern="[0-9]+"
              onChange={handleChange}
              minLength="4"
              maxLength="4"
              required
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.created}
          </p>
        </div>
        <div className="form-picture__input form-picture__input_no-error">
          <p className="form__label">Ориентация</p>
          <label className="form__radio-label" htmlFor="portrait">
            Портретная
          </label>
          <input
            type="radio"
            id="portrait"
            name="orientation"
            onChange={handleChange}
            value="portrait"
            checked={values.orientation === 'portrait'}

            // disabled={blocked}
          ></input>
          <label className="form__radio-label" htmlFor="landscape">
            Альбомная
          </label>
          <input
            type="radio"
            id="landscape"
            name="orientation"
            value="landscape"
            checked={values.orientation === 'landscape'}
            onChange={handleChange}
            // disabled={blocked}
          ></input>
        </div>

        <div className="form-picture__input">
          <label className="form__label" htmlFor="priceRub">
            Цена в рублях
            <input
              className="form__input"
              type="text"
              id="priceRub"
              name="priceRub"
              value={values.priceRub || ''}
              pattern="[0-9]+"
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.priceRub}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="priceEur">
            Цена в евро
            <input
              className="form__input"
              type="text"
              id="priceEur"
              name="priceEur"
              value={values.priceEur || ''}
              pattern="[0-9]+"
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.priceEur}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="ownerRu">
            Правообладатель
            <input
              className="form__input"
              type="text"
              id="ownerRu"
              name="ownerRu"
              value={values.ownerRu || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.ownerRu}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="ownerEn">
            Owner
            <input
              className="form__input"
              type="text"
              id="ownerEn"
              name="ownerEn"
              value={values.ownerEn || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.ownerEn}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="techniqueRu">
            Техника
            <input
              className="form__input"
              type="text"
              id="techniqueRu"
              name="techniqueRu"
              value={values.techniqueRu || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.techniqueRu}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="techniqueEn">
            Technique
            <input
              className="form__input"
              type="text"
              id="techniqueEn"
              name="techniqueEn"
              value={values.techniqueEn || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.techniqueEn}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="sizeRu">
            Размер
            <input
              className="form__input"
              type="text"
              id="sizeRu"
              name="sizeRu"
              value={values.sizeRu || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.sizeRu}
          </p>
        </div>
        <div className="form-picture__input">
          <label className="form__label" htmlFor="sizeEn">
            Size
            <input
              className="form__input"
              type="text"
              id="sizeEn"
              name="sizeEn"
              value={values.sizeEn || ''}
              onChange={handleChange}
              // disabled={blocked}
            ></input>
          </label>
          <p className="form__input-error profile__input-error">
            {errors.sizeEn}
          </p>
        </div>

        <div className="form-picture__input form-picture__input_no-error">
          <p className="form__label">Разделы</p>
          <ul className="form__checkboxes">
            {sections.map((section) => {
              let checked;
              if (values.sections) {
                checked = values.sections.some((sect) => {
                  return sect === section._id;
                });
              } else {
                checked = false;
              }

              return (
                <li className="form__checkbox" key={section._id}>
                  <input
                    type="checkbox"
                    id={section._id}
                    name="sections"
                    onChange={handleCheck}
                    value={section._id}
                    checked={checked}
                  ></input>
                  <label className="form__checkbox-label" htmlFor={section._id}>
                    {section.nameRu}
                  </label>{' '}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="form-picture__input  form-picture__input_no-error">
          <p className="form__label">Серии</p>
          <ul className="form__checkboxes">
            {series.map((series) => {
              let checked;
              if (values.series) {
                checked = values.series.some((ser) => {
                  return ser === series._id;
                });
              } else {
                checked = false;
              }

              return (
                <li className="form__checkbox" key={series._id}>
                  <input
                    type="checkbox"
                    id={series._id}
                    name="series"
                    onChange={handleCheck}
                    value={series._id}
                    checked={checked}
                  ></input>
                  <label className="form__checkbox-label" htmlFor={series._id}>
                    {series.nameRu}
                  </label>{' '}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Конец инпутов */}

        <p className="api-error"> {apiError}</p>
        <div className="form-picture__buttons">
          <button
            className="button form-picture__button"
            type="submit"
            disabled={!isValid || apiError}
          >
            Сохранить
          </button>
          <button
            className="button form-picture__button"
            type="button"
            onClick={handleReject}
          >
            Отказаться
          </button>
        </div>
      </form>
    </div>
  );
}

// Передлать editpicture в formpicture.
// При добавлении картины не передавать картину в компонент.
// Дополнительные поля выводить только при отсутствии картины.
// Завязать рендеринг на наличие картины

export default FormPicture;
