import './Series.css';
import React from 'react';

import Picture from '../Picture/Picture';

function Series({
  series,
  lang,
  pictures,
  onlyNoSeries,
  section,
  user,
  openPopupLetter,
  openPopupDelete,
  openPopupEdit,
}) {
  const [picturesHere, setPicturesHere] = React.useState([]);

  function deleteSeries() {
    openPopupDelete(series, 'series');
  }

  function editSeries() {
    openPopupEdit(series, 'series');
  }

  React.useEffect(() => {
    const picturesInSection = pictures.filter((picture) => {
      return picture.series.some((ser) => {
        return ser === series._id;
      });
    });
    setPicturesHere(picturesInSection);
  }, [pictures, series._id]);

  return (
    <section className="series">
      {!onlyNoSeries && (
        <h2 className="series__title" id={series.nameEn}>
          {series[`name${lang}`]}
          {user.admin && (
            <>
              <button
                className="little-button little-button_type_edit series__button"
                onClick={editSeries}
              ></button>
              <button
                className="little-button little-button_type_delete series__button"
                onClick={deleteSeries}
              ></button>
            </>
          )}
        </h2>
      )}
      <ul className="series__list">
        {picturesHere.map((picture) => (
          <Picture
            picture={picture}
            lang={lang}
            section={section}
            key={picture._id}
            user={user}
            openPopupLetter={openPopupLetter}
            openPopupDelete={openPopupDelete}
          />
        ))}
      </ul>
    </section>
  );
}
export default Series;
