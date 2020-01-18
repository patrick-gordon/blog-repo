const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');


const UserRouter = require('./endpoints/users/user-router.js');
const PostRouter = require('./endpoints/posts/post-router');
const AuthRouter = require('./endpoints/auth/auth-router.js');


const server = express();
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })



server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', UserRouter);
server.use('/api/posts', PostRouter);
server.use('/api/auth', AuthRouter);






module.exports = server;