const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '2h',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;