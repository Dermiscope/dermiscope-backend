const { users } = require('../../../core/database/models');
/**
 * Handle Get Users
 * @returns
 */
async function getAll() {
  return await users.findAll();
}

/**
 * Handle Get One User By Option
 * @param {object} option Option
 * @returns
 */
async function getOne(option) {
  return await users.findOne({ where: option });
}

/**
 * Handle Store User
 * @param {object} body Body
 * @returns
 */
async function store(body) {
  return await users.create(body);
}

/**
 * Handle Update User By Option
 * @param {object} option Option
 * @param {string} id User ID
 * @returns
 */
async function update(option, body) {
  return await users.update(body, { where: option });
}

/**
 * Handle Delete User
 * @param {string} id User ID
 * @returns
 */
async function deleteUser(id) {
  return await users.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getOne,
  store,
  update,
  deleteUser,
};
