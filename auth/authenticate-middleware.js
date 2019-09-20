/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const secrets = require('./secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.header.token;
  if(!token) res.status(400).json({ message: 'You must provide an authorization token as "token" in your header' });
  else {
    jwt.verify(token, secrets.jwtSecret, (e, decodedToken) => {
      if(e) res.status(400).json({ message: 'Invalid token' });
      else {
        req.token = decodedToken;
        next();
      }
    });
  }
};
