import React from "react";
import logoImage from "../images/Headerlogo-min.svg";
import { Link, useMatch } from "react-router-dom";
import closeIcon from "../images/Close-Icon-min.png";
import toggleIcon from "../images/toggleIcon.svg";

const Header = ({ handleSignOut, email }) => {
  const [open, setOpen] = React.useState(false);

  const onSignOut = () => {
    handleSignOut();
    setOpen(false);
  };

  const handleMenu = () => {
    setOpen(!open);
  };
  return (
    <header className={`header ${open && "header_opened"}`}>
      <img src={logoImage} alt="Around U.S. logo" className="header__logo" />
      {useMatch("/signin") && (
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      )}
      {useMatch("/signup") && (
        <Link to="/signin" className="header__link">
          Inicia sesión
        </Link>
      )}
      {useMatch("/") && (
        <>
          <div
            className={`header__user-info ${
              open && "header__user-info_opened"
            }`}
          >
            <span className="header__email">{email}</span>
            <button className="header__logout-button" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </div>
          {open ? (
            <img
              src={closeIcon}
              alt="close menu"
              className="header__close-icon"
              onClick={handleMenu}
            />
          ) : (
            <img
              src={toggleIcon}
              alt="toggleIcon"
              className="header__menu-icon"
              onClick={handleMenu}
            />
          )}
        </>
      )}
    </header>
  );
};

export default Header;
