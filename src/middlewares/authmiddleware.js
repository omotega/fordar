const { decodeToken } = require('../utils/token');

const authprotect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const decode = await decodeToken(token);
      if (!decode) {
        return res.status(401).json('user not authorized');
      }
      req.user = decode;

      next();
    } else {
      res.status(401).json({ Status: 'Fail', message: 'user not authorized,no Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  authprotect,
};
