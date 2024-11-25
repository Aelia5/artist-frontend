import './Header.css';

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import LangSwitcher from '../LangSwitcher/LangSwitcher';
import { TranslationContext } from '../../contexts/translationContext';

function Header({ setRus, setEng, data, lang, user }) {
  const navigate = useNavigate();
  const translation = React.useContext(TranslationContext);

  return (
    <header className="header">
      <button
        className="header__logo"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      />
      <nav>
        <ul className="header__sections">
          {data.sections.map((section) => (
            <li className="header__section" key={section._id}>
              <NavLink
                to={`/${section.nameEn}`}
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link_active' : undefined}`
                }
              >
                {section[`name${lang}`]}
              </NavLink>
            </li>
          ))}
          {user.admin && (
            <li className="header__section">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link_active' : undefined}`
                }
              >
                Панель управления
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <LangSwitcher setRus={setRus} setEng={setEng} lang={lang} />
      <button className="header__profile-button" />
    </header>
  );
}

export default Header;
