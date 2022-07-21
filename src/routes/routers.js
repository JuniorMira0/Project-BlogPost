const express = require('express');
const { body } = require('express-validator');
const controllerLogin = require('../controllers/loginController');
const controller = require('../controllers/userController');
const validate = require('../middleware/validation');
const jwt = require('../helpers/jwt');
const { createCategories } = require('../controllers/categoriesController');

const router = express.Router();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  validate.validateFields,
  validate.validateLogin,
  controllerLogin,
);

router
.route('/user/:id')
.get(
  jwt.verifyToken,
  validate.validateUserId,
  controller.getUserId,
);

router
.route('/user')
.get(
  jwt.verifyToken,
  controller.getUsers,
  )
.post(
  body('email').isEmail(),
  body('displayName').isLength({ min: 8 }),
  body('password').isLength({ min: 6 }),
  validate.validateUser,
  validate.validateEmailExist,
  controller.controllerUser,
  );

router
.route('/categories')
.post(
  body('name').isLength({ min: 1 }),
  jwt.verifyToken,
  validate.validateCategoryName,
  createCategories,
);

module.exports = router;
