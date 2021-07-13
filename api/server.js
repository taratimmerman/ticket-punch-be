const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// INSERT ROUTERS HERE

server.use(helmet());
server.use(cors());
server.use(express.json());

// INSERT ENDPOINTS HERE

module.exports = server;