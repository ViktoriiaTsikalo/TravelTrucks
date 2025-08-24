import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import sprite from "../../assets/img/sprite.svg";

const Header = () => {
  const buildLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <NavLink className={s.logo} to="/">
        <svg className={s.logoSvg}>
          <use href={`${sprite}#logo`} />
        </svg>
      </NavLink>
      <nav className={s.navCenter}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
      <div className={s.rightSection}></div>
    </header>
  );
};

export default Header;
