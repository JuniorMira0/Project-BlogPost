const express = require('express');
const { body } = require('express-validator');
const controllerLogin = require('../controllers/loginController');
const controllerUser = require('../controllers/userController');
const { validateFields, validateLogin } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  validateFields,
  validateLogin,
  controllerLogin,
);

router.post('/user', controllerUser);

module.exports = router;
