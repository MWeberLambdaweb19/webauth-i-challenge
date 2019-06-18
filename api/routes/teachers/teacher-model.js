const db = require('../../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

function find() {
  return db('teachers');
}

function add(user) {
  return db('teachers')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('teachers')
    .where({ id })
    .first();
}

function update(id, changes) {
  return db('teachers')
  .where({id})
  .update(changes)
  .then(() => {
    return db('teachers')
    .where({id})
    .first();
  })
}

function remove(id) {
  return db('teachers')
  .where({id})
  .delete();
}