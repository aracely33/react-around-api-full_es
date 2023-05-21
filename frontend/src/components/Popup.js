import React from "react";

function Popup(props) {
  return (
    <>
      <div className={`popup ${props.isOpen ? " popup_opened" : ""}`}>
        {props.children}
      </div>
    </>
  );
}

export default Popup;
