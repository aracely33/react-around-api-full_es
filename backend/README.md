# Alrededor de los Estados Unidos Back End💻

## Descripción general

Este proyecto es el back end de la aplicación "Alrededor de los Estados Unidos". Está construido en Node.js utilizando el framework de Express 101.

## Funcionalidades

-Permite obtener los usuarios 🙍‍♂️🙍‍♀️

- Permite obtener un usuario mediante su id👩‍🔬
- Permite obtener todas las cartas publicadas🚀
- Permite publicar una foto o avatar 👩‍🦰
- Permite actualizar el perfil y el avatar 👩‍🔧
- Permite eliminar una publicación 🤦‍♀️
- Permite dar o quitar like a una publicación 👍👎

## Tecnologias utilizadas

- NodeJS ![Logo de Node.js](https://nodejs.org/static/images/logo.svg)

- Express ![Logo de Express](https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg)

- Postman ![Logo de Postman](https://www.vectorlogo.zone/logos/getpostman/getpostman-ar21.svg)

- Docker ![Logo de Docker](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMuhCoD2NTJo9r9Pbyz5kI58P4_1JDGQ1TNyVGHLO8Q&s)

## GET Usuarios

`GET /users` Retorna todos los usuarios 👥

## GET Usuario por id 👨‍🔬

`GET /users/:userId` Retorna el usuario filtrado por un id

## POST Usuario 👨

`POST /users` Crea un nuevo usuario

## PATCH Usuario - perfil 👨

`PATCH /users/me` Actualiza el perfil

## PATCH Usuario -Avatar 👨

`PATCH /users/me/avatar` Actualiza el avatar

## GET Cards 🎴

`GET /cards` Devuelve todas las tarjetas de la base de datos

## POST Cards 🎴

`POST /cards` crea una tarjeta con name y link pasados en el body de la petición.Se debe establecer owner;

## DELETE Cards 🎴

`DELETE /cards/:cardsId` Elimina una tarjeta por su \_id ;

## PUT Cards-likes 🎴

`PUT /cards/:cardId/likes ` Da like a una tarjeta;;

## DELETE Cards-likes 🎴

`DELETE /cards/:cardId/likes` Elimina el like de una tarjeta;

## Directorios

`/controllers` -- Archivo de controladores de response(res) y request(req).

`/routes` — Archivo de rutas.
`/models` — Esquemas de los documentos de mongoDB.

## Scripts

`npm run start` — ejecuta el server.

`npm run dev` — ejecuta el server con hot reload
