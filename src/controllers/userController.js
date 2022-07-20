const createToken = require('../helpers/jwt');
const { User } = require('../database/models');

const controllerUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await User.create({ displayName, email, password, image });

  const token = createToken(email);
  return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
  
    return res.status(200).json(users);
};

const getUserId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  return res.status(200).json(user);
};

module.exports = {
  controllerUser,
  getUsers,
  getUserId,
};
