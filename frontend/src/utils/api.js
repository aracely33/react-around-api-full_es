class API {
  constructor(options) {
    this.options = options;
  }

  getUserInfo() {
    return fetch(
      "https://around.nomoreparties.co/v1/web_es_cohort_04/users/me",
      {
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/web_es_cohort_04/cards", {
      headers: {
        authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleDeleteCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_cohort_04/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleEditProfile(value) {
    return fetch(
      "https://around.nomoreparties.co/v1/web_es_cohort_04/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${value.name}`,
          about: `${value.about}`,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleAddCard(value) {
    return fetch("https://around.nomoreparties.co/v1/web_es_cohort_04/cards", {
      method: "POST",
      headers: {
        authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${value.newPlaceTitle}`,
        link: `${value.newPlaceLink}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleLikeClick(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_cohort_04/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleUnLikeClick(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_cohort_04/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleChangeAvatar(value) {
    return fetch(
      "https://around.nomoreparties.co/v1/web_es_cohort_04/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "a6a0db06-97e2-459a-a0a1-f3c5559ea4e0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: `${value.avatar}`,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default new API();
