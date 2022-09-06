const jwt = require('jsonwebtoken');

async function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
}

async function decodeToken(token) {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {
  generateToken,
  decodeToken,
};
