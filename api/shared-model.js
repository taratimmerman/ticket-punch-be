const db = require('../data/db-config');

const findAll = async (table) => {
  return await db(table);
};

const findBy = (table, filter) => {
  return db(table).where(filter);
};

const findById = async (table, id) => {
  return db(table).where({ id }).first().select('*');
};

const findByUser = (table, id) => {
  return db(table).where({ 'user_id': id }).select('*');
};

const create = async (table, object) => {
  return db(table).insert(object).returning('*');
};

const update = (table, id, object) => {
  return db(table).where({ id: id }).first().update(object).returning('*');
};

const remove = async (table, id) => {
  return await db(table).where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  findByUser,
  create,
  update,
  remove,
};
