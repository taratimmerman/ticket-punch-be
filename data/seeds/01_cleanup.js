const { clean } = require('knex-cleaner');

exports.seed = (knex) => {
  return clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};