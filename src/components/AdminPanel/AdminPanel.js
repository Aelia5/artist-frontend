import './AdminPanel.css';
import React from 'react';
import FormPicture from '../FormPicture/FormPicture';

import { useFormWithValidation } from '../Validation/Validation';

function AdminPanel({ sections, series }) {
  const { values, handleChange, handleCheck, errors, isValid, resetForm } =
    useFormWithValidation();

  const [createSectionOpen, setCreateSectionOpen] = React.useState(false);
  function openCreateSection() {
    setCreateSectionOpen(true);
  }
  function closeCreateSection() {
    setCreateSectionOpen(false);
  }

  const [createSeriesOpen, setCreateSeriesOpen] = React.useState(false);
  function openCreateSeries() {
    setCreateSeriesOpen(true);
  }
  function closeCreateSeries() {
    setCreateSeriesOpen(false);
  }

  const [createPictureOpen, setCreatePictureOpen] = React.useState(false);
  function openCreatePicture() {
    setCreatePictureOpen(true);
  }
  function closeCreatePicture() {
    setCreatePictureOpen(false);
  }

  let apiError;

  function handleSubmit(e) {
    e.preventDefault();

    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  return (
    <main className="admin-panel">
      {createSectionOpen ? (
        <>
          <h2 className="form-title">Создание нового раздела</h2>
          <form
            className="form admin-panel__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label
              className="form__label admin-panel__label"
              htmlFor="sectionRu"
            >
              Введите русское название раздела
              <input
                className="form__input"
                type="text"
                id="sectionRu"
                name="sectionRu"
                value={values.sectionRu || ''}
                onChange={handleChange}
                minlength="2"
                maxlength="100"
                required
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {errors.sectionRu}
            </p>
            <label
              className="form__label admin-panel__label"
              htmlFor="sectionRu"
            >
              Введите английское название раздела
              <input
                className="form__input"
                type="text"
                id="sectionEn"
                name="sectionEn"
                value={values.sectionEn || ''}
                onChange={handleChange}
                minlength="2"
                maxlength="100"
                required
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {errors.sectionEn}
            </p>
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
                onClick={closeCreateSection}
              >
                Отказаться
              </button>
            </div>
          </form>
        </>
      ) : (
        <button type="button" className="button" onClick={openCreateSection}>
          Добавить новый раздел
        </button>
      )}
      {createSeriesOpen ? (
        <>
          <h2 className="form-title">Создание новой серии</h2>
          <form
            className="form admin-panel__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label
              className="form__label admin-panel__label"
              htmlFor="seriesRu"
            >
              Введите русское название серии
              <input
                className="form__input"
                type="text"
                id="seriesRu"
                name="seriesRu"
                value={values.seriesRu || ''}
                onChange={handleChange}
                minlength="2"
                maxlength="100"
                required
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {errors.seriesRu}
            </p>
            <label
              className="form__label admin-panel__label"
              htmlFor="seriesRu"
            >
              Введите английское название серии
              <input
                className="form__input"
                type="text"
                id="seriesEn"
                name="seriesEn"
                value={values.seriesEn || ''}
                onChange={handleChange}
                minlength="2"
                maxlength="100"
                required
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {errors.seriesEn}
            </p>
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
                onClick={closeCreateSeries}
              >
                Отказаться
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          type="button"
          className="button admin-panel__button"
          onClick={openCreateSeries}
        >
          Добавить новую серию
        </button>
      )}
      {createPictureOpen ? (
        <>
          <h2 className="form-title">Создание новой картины</h2>
          <FormPicture
            picture=""
            sections={sections}
            series={series}
            close={closeCreatePicture}
          />
        </>
      ) : (
        <button type="button" className="button" onClick={openCreatePicture}>
          Добавить новую картину
        </button>
      )}
    </main>
  );
}

export default AdminPanel;
