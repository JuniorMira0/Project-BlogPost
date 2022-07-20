const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (data) => {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '2h',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
      jwt.verify(authorization, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  createToken,
  verifyToken,
};