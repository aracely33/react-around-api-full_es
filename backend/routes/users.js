const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  createUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.get('/me', getUserInfo);
router.post('/', createUser); //aquí* no aparace
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
