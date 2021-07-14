const knex = require('knex');
const knexConfig = require('../index');

module.exports = knex(knexConfig[process.env.NODE_ENV]);