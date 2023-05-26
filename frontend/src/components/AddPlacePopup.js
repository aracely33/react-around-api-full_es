import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const { newPlaceLink, newPlaceTitle } = props;
  console.log(newPlaceLink, newPlaceTitle);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({ newPlaceTitle, newPlaceLink });
    props.setNewPlaceLink("");
    props.setNewPlaceTitle("");
  }
  return (
    <PopupWithForm
      title="Nuevo lugar"
      action="Guardar"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      inputs={[
        {
          type: "text",
          placeholder: "Título",
          name: "newPlaceCaption",
          id: "popup__input_new-place-title",
          minLength: "2",
          maxLength: "30",
          onChange: props.onNewPlaceTitleChange,
          value: newPlaceTitle,
        },
        {
          type: "url",
          placeholder: "Enlace a la imagen",
          name: "newPlace",
          id: "popup__input_new-place-pic",
          onChange: props.onNewPlaceLinkChange,
          value: newPlaceLink,
        },
      ]}
    />
  );
}
