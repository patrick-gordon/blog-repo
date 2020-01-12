const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const UserRouter = require('./endpoints/users/user-router.js');
const PostRouter = require('./endpoints/posts/post-router');
const AuthRouter = require('./endpoints/auth/auth-router.js');


const server = express();

//config obj
const sessionConfig = {
    name: 'trackpad life',
    secret: 'lambda',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', UserRouter);
server.use('/api/posts', PostRouter);
server.use('/api/auth', AuthRouter);
server.use(session(sessionConfig));





module.exports = server;