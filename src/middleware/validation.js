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
  console.log(user);

  if (user.length < 1) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};

const validateDisplayName = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
    .status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

module.exports = {
  validateFields,
  validateLogin,
  validateDisplayName,
};