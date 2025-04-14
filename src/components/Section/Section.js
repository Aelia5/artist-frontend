import './Section.css';
import React from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';
import Series from '../Series/Series';

function Section({ section, lang, data, user, openPopupLetter }) {
  const translation = React.useContext(TranslationContext);

  const [pictures, setPictures] = React.useState([]);
  const [series, setSeries] = React.useState([]);
  const [onlyNoSeries, setOnlyNoSeries] = React.useState([]);

  React.useEffect(() => {
    const picturesInSection = data.pictures.filter((picture) => {
      return picture.sections.some((sect) => {
        return sect === section._id;
      });
    });
    setPictures(picturesInSection);
  }, [data, section._id]);

  React.useEffect(() => {
    const seriesIds = [];
    pictures.forEach((picture) => {
      picture.series.forEach((series) => {
        seriesIds.push(series);
      });
    });
    const uniqueSeriesIds = new Set(seriesIds);
    const seriesInSection = data.series.filter((series) => {
      return uniqueSeriesIds.has(series._id);
    });
    setSeries(seriesInSection);
    setOnlyNoSeries(
      seriesInSection.length === 1 && seriesInSection[0].nameEn === 'No series'
    );
  }, [data, pictures]);

  return (
    <main className="section">
      <h1 className="section__title">{section[`name${lang}`]}</h1>
      {pictures.length === 0 && (
        <p className="section__series-link">{translation.empty}</p>
      )}
      {pictures.length > 0 && series.length > 1 && (
        <ul className="section__series-list">
          {series.map((series) => {
            return (
              <li className="section__series-item" key={series._id}>
                <a className="section__series-link" href={`#${series.nameEn}`}>
                  {series[`name${lang}`]}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <ul className="section__series">
        {series.map((series) => {
          return (
            <Series
              series={series}
              lang={lang}
              pictures={pictures}
              onlyNoSeries={onlyNoSeries}
              key={series._id}
              section={section}
              user={user}
              openPopupLetter={openPopupLetter}
            />
          );
        })}
      </ul>
    </main>
  );
}
export default Section;
