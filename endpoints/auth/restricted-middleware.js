const bcrypt = require('bcryptjs');
const User = require('../users/user-model.js')


module.exports = {
    protected
}
function protected(req, res, next)  {
    console.log('req session', req.session)
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: `you shall not pass` });
    }
}

module.exports 
    
    
