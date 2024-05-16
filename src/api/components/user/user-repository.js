const { users } = require('../../../core/database/models');
/**
 * Handle Get Users
 * @returns
 */
async function getAll() {
  return await users.findAll();
}

/**
 * Handle Get User By ID
 * @param {string} id User ID
 * @returns
 */
async function getById(id) {
  return await users.findOne({ where: { id } });
}

/**
 * Handle Get User By Google ID
 * @param {string} id Google ID
 * @returns
 */
async function getByIdGoogle(id) {
  return await users.findOne({ where: { id_google: id } });
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
 * Handle Update User
 * @param {string} id User ID
 * @param {object} body Body
 * @returns
 */
async function update(id, body) {
  return await users.update(body, { where: { id } });
}

/**
 * Handle Update Last Login
 * @param {string} id User ID
 * @returns
 */
async function updateLastLogin(id) {
  return await users.update(
    {
      lastLoginAt: new Date(),
    },
    { where: { id } }
  );
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
  getById,
  getByIdGoogle,
  store,
  update,
  updateLastLogin,
  deleteUser,
};
