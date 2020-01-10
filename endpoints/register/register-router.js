const express = require('express');
const User = require('../users/user-model');

const router = express.Router();

//Create User
router.post('/', (req, res) => {
    const userData = req.body;
  
    User.add(userData)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new user' });
    });
});

module.exports = router