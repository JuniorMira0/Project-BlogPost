const express = require('express');
const { body } = require('express-validator');
const controllerLogin = require('../controllers/loginController');
const controllerUser = require('../controllers/userController');
const validate = require('../middleware/validation');

const router = express.Router();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  validate.validateFields,
  validate.validateLogin,
  controllerLogin,
);

router.post(
  '/user', 
  body('displayName').isLength({ min: 8 }),
  validate.validateDisplayName,
  controllerUser,
  );

module.exports = router;
