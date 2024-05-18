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
 * Handle Get User By Option
 * @param {string} id User ID
 * @returns {}
 */
async function getOne(option) {
  try {
    return await UserRepository.getOne(option);
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
    return await UserRepository.update({ id }, body);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      throw sequelizeValidationError(error);
    }
    throw error;
  }
}

/**
 * Hanlde Store Or Update User By Google ID
 * @param {string} id Google ID
 * @param {object} body Body
 * @returns {}
 */
async function storeOrUpdate(id, body) {
  try {
    const user = await getOne({ id_google: id });
    if (user) {
      const data = {
        fullname: body.fullname,
        image: body.image,
        lastLoginAt: body.time,
      };
      await UserRepository.update({ id_google: id }, data);
    } else {
      const id = GenerateID();
      const data = {
        id,
        id_google: body.id_google,
        fullname: body.fullname,
        email: body.email,
        image: body.image,
      };
      await store(data);
    }
    return true;
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
  getOne,
  store,
  update,
  storeOrUpdate,
  deleteUser,
};
