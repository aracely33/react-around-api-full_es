import React from "react";

function ImagePopup(props) {
  return (
    <div className="popup__container popup__container_function-image">
      <button
        type="button"
        className="close-button pointer"
        onClick={props.onClose}
      ></button>
      <img
        src={`${props.cardInfoPopup.link}`}
        alt={props.cardInfoPopup.cardName}
        className="popup__image"
      />
      <p className="popup__imagedescription">{props.cardInfoPopup.cardName}</p>
    </div>
  );
}

export default ImagePopup;
