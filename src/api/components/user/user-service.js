const { Sequelize } = require('sequelize');
const { sequelizeValidationError } = require('../../../core/errors');
const GenerateID = require('../../../utils/uuid');
const UserRepository = require('./user-repository');

/**
 * Handle Get Users
 * @returns []
 */
async function getAll() {
  try {
    return await UserRepository.getAll();
  } catch (error) {
    throw error;
  }
}

/**
 * Handle Get User By ID
 * @param {string} id User ID
 * @returns {}
 */
async function getById(id) {
  try {
    return await UserRepository.getById(id);
  } catch (error) {
    throw error;
  }
}

/**
 * Handle Get User By Google ID
 * @param {string} id Google ID
 * @returns {}
 */
async function getByIdGoogle(id) {
  try {
    return await UserRepository.getByIdGoogle(id);
  } catch (error) {
    throw error;
  }
}

/**
 * Handle Store User
 * @param {object} body Body
 * @returns {}
 */
async function store(body) {
  try {
    const id = GenerateID();
    return await UserRepository.store({ id, ...body });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      throw sequelizeValidationError(error);
    }
    throw error;
  }
}

/**
 * Handle Update User
 * @param {string} id User ID
 * @param {object} body Body
 * @returns {}
 */
async function update(id, body) {
  try {
    return await UserRepository.update(id, body);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      throw sequelizeValidationError(error);
    }
    throw error;
  }
}

/**
 * Handle Delete User
 * @param {string} id User ID
 * @returns {}
 */
async function deleteUser(id) {
  try {
    return await UserRepository.deleteUser(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  getByIdGoogle,
  store,
  update,
  deleteUser,
};
