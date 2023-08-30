const express = require('express');
const { registerUser,  login, logout } = require('../controllers/users')
const { authenticated } = require('../middleware/auth')

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(authenticated, logout);

module.exports = router;