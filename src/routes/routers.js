const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/userController');
const controllerLogin = require('../controllers/loginController');
const {
  createCategories,
  getCategories,
} = require('../controllers/categoriesController');
const { getPost, getPostId } = require('../controllers/postController');
const validate = require('../middleware/validation');
const jwt = require('../helpers/jwt');

const router = express.Router();

router
  .route('/login')
  .post(
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    validate.validateFields,
    validate.validateLogin,
    controllerLogin,
  );

router
  .route('/user/:id')
  .get(jwt.verifyToken, validate.validateUserId, controller.getUserId);

router
  .route('/user')
  .get(jwt.verifyToken, controller.getUsers)
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
  )
  .get(jwt.verifyToken, getCategories);

router.route('/post').get(jwt.verifyToken, getPost);

router.route('/post/:id').get(jwt.verifyToken, getPostId);

module.exports = router;
