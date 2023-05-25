import React from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../contexts/UserContext";

export default function EditAvatarPopup(props) {
  const link = React.useRef();
  const currentUser = React.useContext(UserContext);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(link.current.value);
    link.current.value = "";
  }

  return (
    <PopupWithForm
      title="Cambiar foto de perfil"
      action=" Guardar"
      onSubmit={handleSubmit}
      onClose={props.onClose}
      inputs={[
        {
          type: "url",
          placeholder: "Enlace a la imagen",
          name: "avatar",
          id: "form__input form__input_new-avatar-url popup__input",
          ref: link,
        },
      ]}
    />
  );
}
