const createToken = require('../helpers/jwt');

const controllerLogin = async (req, res) => {
  const { email } = req.body;

  const token = createToken(email);
  return res.status(200).json({ token });
};
module.exports = controllerLogin;
