export const BASE_URL = "https://localhost:4000";

export const register = (password, email) => {
  console.log(`${BASE_URL}/signup`);
  console.log(JSON.stringify({ password, email }));

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      console.log(response + "en register de auth");
      return response.json();
    })
    .catch((err) => console.log(err, "por qué fallo el fetch?"));
};

export const authorize = (password, email) => {
  console.log(`${BASE_URL}/signin`);
  console.log(password, email);
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  console.log(token);
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
