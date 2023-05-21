import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardForm(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onEraseCard(props.card);
  }

  return (
    <PopupWithForm
      title="¿Estás seguro?"
      action="Sí"
      onSubmit={handleSubmit}
      inputs={[]}
      onClose={props.onClose}
    />
  );
}
