const express = require('express');
const User = require('../users/user-model')
const bcypt = require('bcryptjs');
const credentials = req.body;
const hash = bcypt.hashSync(credentials.password, 14);
credentials.password = hash;

const router = express.Router();

router.post('/', (req,res) => {
    let {username, password} = req.body;

    User.findByUsername({username})
    .first()
    .then(user => {
        if(user && bcypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!`});
        } else {
            res.status(401).json({ message: `Invalid Credentials`})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: `Error logging in`})
    })
})