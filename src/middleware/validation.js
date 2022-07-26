const { validationResult } = require('express-validator');
const { User } = require('../database/models');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findAll({ where: { email, password } });
  
  if (user.length < 1) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { errors } = validationResult(req);
  try {
    if (errors[0].param === 'displayName') {
      return res
      .status(400).json({ message: '"displayName" length must be at least 8 characters long' });
    } if (errors[0].param === 'email') {
      return res
      .status(400).json({ message: '"email" must be a valid email' });
    } if (errors[0].param === 'password') {
      return res
      .status(400).json({ message: '"password" length must be at least 6 characters long' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

const validateEmailExist = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findAll({ where: { email } });

  if (user.length >= 1) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

const validateUserId = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  next();
};

const validateCategoryName = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  validateFields,
  validateLogin,
  validateUser,
  validateEmailExist,
  validateUserId,
  validateCategoryName,
};