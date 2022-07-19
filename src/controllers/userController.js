const createToken = require('../helpers/jwt');
const { User } = require('../database/models');

const controllerUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await User.create({ displayName, email, password, image });

  const token = createToken(email);
  return res.status(200).json({ token });
};

module.exports = controllerUser;
