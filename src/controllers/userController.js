const createToken = require('../helpers/jwt');
const { User } = require('../database/models');

const controllerUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await User.create({ displayName, email, password, image });

  const token = createToken(email);
  return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
  
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  controllerUser,
  getUsers,
};
