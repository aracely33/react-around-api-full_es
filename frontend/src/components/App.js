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
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        setToken(jwt);
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

  React.useEffect(() => {
    if (token) {
      api.getUserInfo(token).then((data) => {
        setCurrentUser(data.data);
      });
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      api.getInitialCards(token).then((data) => {
        setCards(data.data);
      });
    }
  }, [token]);

  const renderCards = () =>
    cards.map((card) => {
      return (
        <Card
          key={card._id}
          cardId={card._id}
          cardOwnerId={card.owner}
          link={card.link}
          cardName={card.name}
          cardLikes={card.likes}
          onCardClick={handleCardClick}
          onDeleteCardAsk={handleEraseAsk}
          onCardLike={() => handleCardLike(card)}
        />
      );
    });

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api.handleLikeCardStatus(card._id, isLiked, token).then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard.data : c))
      );
    });
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

  function handleUpdateAvatar(link) {
    api
      .handleChangeAvatar(link, token)
      .then((data) =>
        setCurrentUser({ ...currentUser, avatar: data.data.avatar })
      );
    closeAllPopups();
  }

  /////Modificar el Profile
  function handleUpdateUser({ name, about }) {
    api.handleEditProfile({ name, about }, token).then((data) => {
      setCurrentUser({
        ...currentUser,
        name: data.data.name,
        about: data.data.about,
      });
    });

    closeAllPopups();
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handleUserDescriptionChange(e) {
    setUserDescription(e.target.value);
  }

  //Agregar un nuevo Lugar
  function handleAddPlaceSubmit({ newPlaceTitle: title, newPlaceLink: link }) {
    api.handleAddCard({ title, link }, token).then((newCard) => {
      setCards([...cards, newCard.data]);
    });
    closeAllPopups();
  }
  function handleNewPlaceTitleChange(e) {
    setNewPlaceTitle(e.target.value);
  }

  function handleNewPlaceLinkChange(e) {
    setNewPlaceLink(e.target.value);
  }

  function handleCardDelete(card) {
    api.handleDeleteCard(
      card.cardId,
      () => {
        function getDondeletedCards(item) {
          return item._id !== card.cardId;
        }
        const newCardArray = cards.filter(getDondeletedCards);
        setCards(newCardArray);
      },
      token
    );

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
