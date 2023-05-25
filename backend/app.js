require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// conectar con el servidor MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

//El logger de solicitud debe estar habilitado antes que todos los controladores de ruta
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);
app.use(auth);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

//logger de errores después de controladores de ruta y antes controladores de errores.
app.use(errorLogger);
app.use(errors());

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({
      message:
        'Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario.',
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({
      message:
        'No existe un usuario con el id solicitado o la solicitud se envió a una dirección inexistente;',
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      message:
        'Al registrarse, se especificó un correo electrónico que ya existe en el servidor',
    });
  }
  res.status(500).send({ message: 'Se ha producido un error en el servidor' });
});

app.listen(4000, () => {
  console.log('escuchando en el puerto 4000');
});
