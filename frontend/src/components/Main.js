import React from "react";
import { UserContext } from "../contexts/UserContext";

function Main(props) {
  const currentUser = React.useContext(UserContext);

  return (
    <>
      <div className="main">
        <div className="profile">
          <div
            className="profile__avatar-container"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              className="profile__avatar-edit-button"
              type="butt on"
              onClick={props.onEditAvatarClick}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-edit">
              <p className="profile__info-name">{currentUser.name}</p>
              <button
                type="button"
                className="profile__info-edit-button pointer"
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className="profile__info-occupation">{currentUser.about}</p>
          </div>

          <div className="profile__button-container">
            <button
              type="button"
              className="profile__add-button pointer"
              onClick={props.onAddPlaceClick}
            ></button>
          </div>
        </div>
        <div className="gallery">{props.renderCards()}</div>
      </div>
    </>
  );
}

export default Main;
