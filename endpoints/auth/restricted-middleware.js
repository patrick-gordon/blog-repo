const bcrypt = require('bcryptjs');
const User = require('../users/user-model.js')
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    //see if token
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'not verified'})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });

    } else{
        res.status(400).json({
            messgae: ' no token provided'
        })
    }

    //check if token is valid => rehash head + payload + secret to match verify signature
    

    //extract user id, username, posts

}



    
    
