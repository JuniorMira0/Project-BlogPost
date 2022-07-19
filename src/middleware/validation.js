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

  if (user.length >= 1) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
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

module.exports = {
  validateFields,
  validateLogin,
  validateUser,
  validateEmailExist,
};