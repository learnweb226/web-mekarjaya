const jwt = require('jsonwebtoken');
require("dotenv").config()

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_JWT);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
