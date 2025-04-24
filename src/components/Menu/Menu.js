import './Menu.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({ data, lang, user, closeMenu }) {
  return (
    <nav>
      <ul className="menu">
        {data.sections.map((section) => (
          <li className="menu__section" key={section._id}>
            <NavLink
              to={`/${section.nameEn}`}
              className={({ isActive }) =>
                `menu__link ${isActive ? 'menu__link_active' : undefined}`
              }
              onClick={closeMenu}
            >
              {section[`name${lang}`]}
            </NavLink>
          </li>
        ))}
        {user.admin && (
          <li className="menu__section">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `menu__link ${isActive ? 'menu__link_active' : undefined}`
              }
              onClick={closeMenu}
            >
              Панель управления
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
