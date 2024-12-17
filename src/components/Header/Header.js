import './Header.css';

import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LangSwitcher from '../LangSwitcher/LangSwitcher';
import Menu from '../Menu/Menu';

function Header({ setRus, setEng, width, data, lang, user }) {
  const navigate = useNavigate();
  const menuRef = useRef();
  const closeRef = useRef();
  const langRef = useRef();

  const [menuOpened, setMenuOpened] = React.useState(false);
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
          navigate('/');
        }}
      />

      {width <= 500 ? (
        <div></div>
      ) : (
        <Menu data={data} lang={lang} user={user} />
      )}
      <LangSwitcher
        setRus={setRus}
        setEng={setEng}
        lang={lang}
        langRef={langRef}
      />
      <button
        className="header__profile-button"
        onClick={() => {
          user ? navigate('/profile') : navigate('/signin');
        }}
      />
      <button
        className={`header__button ${
          menuOpened ? 'header__button_type_close' : 'header__button_type_menu'
        }`}
        onClick={menuOpened ? closeMenu : openMenu}
        ref={closeRef}
      />
      {menuOpened && (
        <div className="header__overlay">
          <div className="header__container" ref={menuRef}>
            {width > 500 ? (
              <div></div>
            ) : (
              <Menu data={data} lang={lang} user={user} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
