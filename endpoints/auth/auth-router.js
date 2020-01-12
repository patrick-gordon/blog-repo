
const express = require('express');
const User = require('../users/user-model')
const bcrypt = require('bcryptjs');
const Protected = require('./restricted-middleware')

const router = express.Router();

router.post('/login',  (req,res) => {
    const { username, password } = req.body;
    

    User.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            // add user info to session
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}!`});
        } else {
            res.status(401).json({ message: `Invalid Credentials`})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: `Error logging in`})
    })
});

//Create User
router.post('/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 10);  //number as second param is how long it takes to hash password
    user.password = hash;

    User.add(user)
    .then(saved => {
      req.session.user = saved;
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create new user' });
    });
  });



module.exports = router;


