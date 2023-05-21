const express = require('express');
const mongoose = require('mongoose');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();
// conectar con el servidor MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644d42e597365c027e0db5eb',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use((req, res) => {
  res.status(500).send('An error has ocurred on the server');
});
app.listen(3000);
