const express = require('express');
const helmet = require('helmet');

const UserRouter = require('./endpoints/users/user-router.js.js');
const PostRouter = require('./endpoints/posts/post-router.js.js');
const LoginRouter = require('./endpoints/login/login-router.js.js');
const RegisterRouter = require('./endpoints/register/register-router.js');


const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', UserRouter);
server.use('/api/posts', PostRouter);
server.use('/api/login', LoginRouter);
server.use('/api/register', RegisterRouter);





module.exports = server;