import React from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../contexts/UserContext";

export default function EditAvatarPopup(props) {
  const currentUser = React.useContext(UserContext);

  const avatarRef = React.useRef(currentUser.avatar);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
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
          ref: avatarRef,
          value: undefined,
        },
      ]}
    />
  );
}
