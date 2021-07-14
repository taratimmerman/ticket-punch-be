const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const restrict = require('./middleware/restricted');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const projectsRouter = require('./projects/projects-router');
const ticketsRouter = require('./tickets/tickets-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restrict, usersRouter);
server.use('/api/projects', restrict, projectsRouter);
server.use('/api/tickets', restrict, ticketsRouter);

module.exports = server;