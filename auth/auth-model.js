const db = require('../database/dbConfig');

function find() {
  return db('users');
}

function findByID(id) {
  return db('users').where({ id });
}

function findByName(name) {
  return db('users').where({ username: name });
}

function insert(user) {
  if(!user || !user.username || !user.password) return false;
  else return db('users').insert(user);
}

module.exports = {
  find,
  findByID,
  findByName,
  insert
};