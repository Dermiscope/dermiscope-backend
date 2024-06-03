const { errorResponder, errorTypes } = require('../../../core/errors');
const FileService = require('./file-service');

/**
 * Handle Get Files
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function getByPrefix(request, response, next) {
  try {
    const result = await FileService.getByPrefix(request.params[0]);
    return response.status(200).json({
      status: 'OK',
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
 * Handle Store File
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function store(request, response, next) {
  try {
    const result = await FileService.store(request);
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
 * Handle Delete File
 * @param {object} request Request
 * @param {object} response Response
 * @param {object} next Next
 * @returns {object}
 */
async function deleteFile(request, response, next) {
  try {
    const deleted = await FileService.deleteFile(request.params[0]);
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
  getByPrefix,
  store,
  deleteFile,
};
