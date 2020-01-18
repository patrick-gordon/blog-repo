
const express = require('express');
const User = require('../users/user-model')
const bcrypt = require('bcryptjs');
const Protected = require('./restricted-middleware')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/login',  (req,res) => {
    const { username, password } = req.body;
    

    User.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            // add user info to session
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.username}!`,
            token
        });
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
router.post('/register', jsonParser, (req, res) => {
 
    const user = req.body.user
    console.log('user', user)
    
  
    const hash = bcrypt.hashSync(user.password, 10);  //number as second param is how long it takes to hash password
    user.password = hash;

    User.add(user)
    .then(saved => {
     const token = generateToken(saved);
      res.status(201).json({
        user: saved,
        token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create new user' });
    });
  });

  function generateToken(user){
    //header payload and verify signature
    // payload => username, ID, roles, experation date
    const payload = {
      sub: user.id,
      username: user.username
    }
  
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
  



module.exports = router;


