import React from "react";
import { UserContext } from "../contexts/UserContext";

function Card(props) {
  const currentUser = React.useContext(UserContext);
  const isLiked = props.cardLikes.some((i) => i === currentUser._id);
  const isOwn = props.cardOwnerId === currentUser._id;

  const cardButtonTrashStyle = isOwn
    ? { display: "block" }
    : { display: "none" };

  function handleClick() {
    props.onCardClick(props);
  }

  function handleAskDelete() {
    props.onDeleteCardAsk(props);
  }

  return (
    <div className="item">
      <button
        type="button"
        className="item__trash-button"
        onClick={handleAskDelete}
        style={cardButtonTrashStyle}
      ></button>
      <img
        className="item__place"
        src={props.link}
        alt={props.cardName}
        onClick={handleClick}
      />
      <div className="item__place-info">
        <div className="item__place-info-container">
          <p className="item__place-info-name">{props.cardName}</p>
        </div>
        <div className="item__likes-container">
          <button
            type="button"
            className={`item__place-like-button  ${
              isLiked ? "item__place-like-button_active" : ""
            } pointer`}
            onClick={props.onCardLike}
          ></button>
          <p className="item__likes-number">{props.cardLikes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
