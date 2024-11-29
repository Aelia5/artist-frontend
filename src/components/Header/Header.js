import './Header.css';

import React from 'react';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import LangSwitcher from '../LangSwitcher/LangSwitcher';
import { TranslationContext } from '../../contexts/translationContext';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

function Header({ setRus, setEng, data, lang, user }) {
  const navigate = useNavigate();
  const menuRef = useRef();
  const closeRef = useRef();
  const langRef = useRef();
  const translation = React.useContext(TranslationContext);

  const [menuOpened, setMenuOpened] = React.useState(true);
  function openMenu() {
    setMenuOpened(true);
  }
  function closeMenu() {
    setMenuOpened(false);
  }

  React.useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        menuOpened &&
        !menuRef.current.contains(e.target) &&
        !closeRef.current.contains(e.target) &&
        !langRef.current.contains(e.target)
      ) {
        setMenuOpened(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [menuOpened]);

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
      <LangSwitcher
        setRus={setRus}
        setEng={setEng}
        lang={lang}
        langRef={langRef}
      />
      <button className="header__profile-button" />
      <button
        className={`header__button ${
          menuOpened ? 'header__button_type_close' : 'header__button_type_menu'
        }`}
        onClick={menuOpened ? closeMenu : openMenu}
        ref={closeRef}
      />
      {menuOpened && (
        <div className="header__overlay">
          <div className="header__container" ref={menuRef}></div>
        </div>
      )}
    </header>
  );
}

export default Header;
