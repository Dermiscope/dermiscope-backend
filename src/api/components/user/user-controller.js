const { errorResponder, errorTypes } = require('../../../core/errors');
const UserService = require('./user-service');

/**
 * Handle Get Users
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function getAll(request, response, next) {
  try {
    const result = await UserService.getAll();
    return response.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    next(errorResponder(error.errorType || errorTypes.SERVER, error.message));
  }
}

/**
 * Handle Get User By ID
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function getById(request, response, next) {
  try {
    const result = await UserService.getById(request.params.id);
    return response.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    next(errorResponder(error.errorType || errorTypes.SERVER, error.message));
  }
}

/**
 * Handle Store User
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function store(request, response, next) {
  try {
    const result = await UserService.store(request.body);
    return response.status(201).json({
      status: 'Created',
      data: result,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

/**
 * Handle Update User
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function update(request, response, next) {
  try {
    const [result] = await UserService.update(request.params.id, request.body);
    const newData = result !== 0 ? request.body : null;
    return response.status(200).json({
      status: 'OK',
      data: newData,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

/**
 * Handle Delete USer
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function deleteUser(request, response, next) {
  try {
    const result = await UserService.deleteUser(request.params.id);
    const deleted = result !== 0 ? request.params.id : null;
    return response.status(200).json({
      status: 'OK',
      data: deleted,
    });
  } catch (error) {
    next(
      errorResponder(
        error.errorType || errorTypes.SERVER,
        error.message,
        error.validationErrors
      )
    );
  }
}

module.exports = {
  getAll,
  getById,
  store,
  update,
  deleteUser,
};
