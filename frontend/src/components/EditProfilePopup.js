import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const { name, about } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      title="Editar Perfil"
      action="Guardar"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      inputs={[
        {
          type: "text",
          placeholder: "Nombre",
          name: "name",
          id: "nombre",
          minLength: "2",
          maxLength: "40",
          value: name || "",
          onChange: props.onUserNameChange,
        },
        {
          type: "text",
          placeholder: "Acerca de mi",
          name: "about",
          id: "ocupación",
          minLength: "2",
          maxLength: "200",
          value: about || "",
          onChange: props.onUserDescriptionChange,
        },
      ]}
    />
  );
}
