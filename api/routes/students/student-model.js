const db = require('../../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

function find() {
  return db('students');
}

function add(user) {
  return db('students')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('students')
    .where({ id })
    .first();
}

function update(id, changes) {
  return db('students')
  .where({id})
  .update(changes)
  .then(() => {
    return db('students')
    .where({id})
    .first();
  })
}

function remove(id) {
  return db('students')
  .where({id})
  .delete();
}