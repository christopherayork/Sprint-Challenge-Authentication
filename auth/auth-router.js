const router = require('express').Router();
const userDB = require('./auth-model');
const bcrypt = require('bcrypt');
const errorWrapper = require('../handlers/errorWrapper');
const generateToken = require('./generateToken');

router.post('/register', errorWrapper(async (req, res) => {
  // implement registration
  let user = req.body;
  if(!user || !user.username || !user.password) res.status(400).json({ message: 'You must provide a user object with username and password' });
  else {
    user.password = await bcrypt.hash(user.password, 8);
    let [r] = await userDB.insert(user);
    if(r) res.status(201).json(r);
    else res.status(400).json({ message: 'Could not create user' });
  }
}));

router.post('/login', errorWrapper(async (req, res) => {
  // implement login
  let creds = req.body;
  if(!creds || !creds.username || !creds.password) res.status(400).json({ message: 'You must provide a username and password' });
  else {
    let [user] = await userDB.findByName(creds.username);
    if(user && await bcrypt.compare(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}!`, token });
    }
    else res.status(400).json({ message: 'username or password is incorrect' });
  }
}));

module.exports = router;
