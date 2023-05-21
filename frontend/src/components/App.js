import React from "react";
import { UserContext } from "../contexts/UserContext";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import DeleteCardForm from "./DeleteCardForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isAvatarProfilePopupOpen, setAvatarProfilePopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [newPlaceLink, setNewPlaceLink] = React.useState("");
  const [newPlaceTitle, setNewPlaceTitle] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");

  const [imagePic, setImagePic] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [eraseCardAsk, setEraseCardAsk] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        setCurrentUser(info);
        setUserName(info.name);
        setUserDescription(info.about);
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderCards = () =>
    cards.map((card) => {
      const { _id, owner, link, name, likes } = card;

      return (
        <Card
          key={_id}
          cardId={_id}
          cardOwnerId={owner._id}
          link={link}
          cardName={name}
          cardLikes={likes}
          onCardClick={handleCardClick}
          onDeleteCardAsk={handleEraseAsk}
          onCardLike={() => handleCardLike(card)}
        />
      );
    });

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .handleUnLikeClick(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((err) => console.error(err));
    } else {
      api
        .handleLikeClick(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })

        .catch((err) => console.error(err));
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setAvatarProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePic(true);
  }
  ///Soporte para eliminar tarjetas

  function handleEraseAsk(card) {
    setEraseCardAsk(true);
    setSelectedCard(card);
  }
  /////cambiar avatar

  function handleUpdateAvatar(data) {
    api
      .handleChangeAvatar(data)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error(err));
    closeAllPopups();
  }

  /////Modificar el Profile
  function handleUpdateUser(data) {
    api
      .handleEditProfile(data)
      .then((res) => {
        api
          .getUserInfo()
          .then((info) => {
            setCurrentUser(info);
            setUserName(info.name);
            setUserDescription(info.about);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    closeAllPopups();
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handleUserDescriptionChange(e) {
    setUserDescription(e.target.value);
  }

  //Agregar un nuevo Lugar
  function handleAddPlaceSubmit(data) {
    api
      .handleAddCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.error(err));
    closeAllPopups();
  }
  function handleNewPlaceTitleChange(e) {
    setNewPlaceTitle(e.target.value);
  }

  function handleNewPlaceLinkChange(e) {
    setNewPlaceLink(e.target.value);
  }

  function handleCardDelete(card) {
    api
      .handleDeleteCard(card.cardId)
      .then((deletedCardId) => {
        function dontDeleted(item) {
          return item._id !== card.cardId;
        }
        const newCardArray = cards.filter(dontDeleted);
        setCards(newCardArray);
      })
      .catch((err) => console.error(err));

    closeAllPopups();
  }

  function closeAllPopups() {
    setAvatarProfilePopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard("");
    setImagePic(false);
    setEraseCardAsk(false);
  }

  //Para la lógica de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
  };

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res.data) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    handleTokenCheck();
  }, [loggedIn, navigate]);

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <Header handleSignOut={handleSignOut} email={email} />
        <Routes>
          <Route
            path="/"
            exact
            element={<ProtectedRoute loggedIn={loggedIn} />}
          >
            <Route
              path="/"
              element={
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  renderCards={renderCards}
                ></Main>
              }
            />
          </Route>
          <Route exact path="/signup" element={<Register />} />
          <Route
            exact
            path="/signin"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>

        <InfoTooltip />
        <Footer></Footer>

        <Popup isOpen={eraseCardAsk}>
          <DeleteCardForm
            card={selectedCard}
            onEraseCard={handleCardDelete}
            onClose={closeAllPopups}
          ></DeleteCardForm>
        </Popup>

        <Popup isOpen={isEditProfilePopupOpen}>
          <EditProfilePopup
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onUserNameChange={handleUserNameChange}
            onUserDescriptionChange={handleUserDescriptionChange}
            setUserDescription={setUserDescription}
            setUserName={setUserName}
            name={userName}
            about={userDescription}
          ></EditProfilePopup>
        </Popup>

        <Popup isOpen={isAvatarProfilePopupOpen}>
          <EditAvatarPopup
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
        </Popup>

        <Popup isOpen={imagePic}>
          <ImagePopup
            cardInfoPopup={selectedCard}
            onClose={closeAllPopups}
          ></ImagePopup>
        </Popup>

        <Popup isOpen={isAddPlacePopupOpen}>
          <AddPlacePopup
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onNewPlaceTitleChange={handleNewPlaceTitleChange}
            onNewPlaceLinkChange={handleNewPlaceLinkChange}
            newPlaceLink={newPlaceLink}
            newPlaceTitle={newPlaceTitle}
            setNewPlaceLink={setNewPlaceLink}
            setNewPlaceTitle={setNewPlaceTitle}
            name={userName}
            about={userDescription}
          ></AddPlacePopup>
        </Popup>
      </UserContext.Provider>
    </>
  );
}

export default App;
