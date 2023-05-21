import React from "react";
import aprove from "../images/success-icon.svg";
import denied from "../images/failedredCross.svg";

const InfoTooltip = ({ error, infoToolOpen, handleClose }) => {
  return (
    <div className={`popup ${infoToolOpen && "popup_opened"}`}>
      <div className="popup__container popup__conatiner_function-infoToolTip">
        <button
          className="close-button pointer"
          type="button"
          onClick={handleClose}
        />
        {error ? (
          <>
            <img
              src={denied}
              alt="Icono de rechazo"
              className="popup__image popup__image_type-infoTooltip"
            />
            <h2 className="popup__message">
              Uy, algo salió mal. Por favor, inténtalo de nuevo
            </h2>
          </>
        ) : (
          <>
            <img
              src={aprove}
              alt="Icono de aprobación"
              className="popup__image popup__image_type-infoTooltip"
            />
            <h2 className="popup__message">¡Correcto! Ya estás registrado</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
