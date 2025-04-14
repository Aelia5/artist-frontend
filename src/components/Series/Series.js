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
}) {
  const [picturesHere, setPicturesHere] = React.useState([]);

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
          />
        ))}
      </ul>
    </section>
  );
}
export default Series;
