// authMiddleware.js

const jsonwebtoken = require('jsonwebtoken');
const { Users } = require("./db/models");
const {key , keyPub}= require("./keys");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      console.log('Decoded Token:', decodedToken);
      req.user = await Users.findByPk(decodedToken.sub, { attributes: { exclude: ['password'] } });
      next(); // Continue to the next middleware or route
    } catch (e) {
      console.log('Error:', e);
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Token not found' });
  }
};

module.exports = authMiddleware;
