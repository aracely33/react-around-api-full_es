const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        const urlRegex =
          /^(http|https):\/\/(www\.)?[\w.~:/?%#[\]@!$&'()*+,;=-]+[#]?$/;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} no es una URL válida`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        const urlRegex = /^\S+@\S+\.\S+$/;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} no es un correo válido`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
