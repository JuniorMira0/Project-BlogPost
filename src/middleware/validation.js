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

module.exports = {
  validateFields,
  validateLogin,
};