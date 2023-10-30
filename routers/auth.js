const express = require('express');
const router = express.Router();

const {register, login, updateUser} = require('../controllers/auth.js');
const authenticationMiddleware = require('../middleware/authentication.js');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticationMiddleware, updateUser);

module.exports = router;