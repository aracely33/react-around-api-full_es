const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.get('/me', getUserInfo);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
