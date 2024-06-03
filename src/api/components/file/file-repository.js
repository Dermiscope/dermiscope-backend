const GoogleStorage = require('../../../core/storage/index');

/**
 * Handle init file
 * @param {object} body File
 * @returns
 */
async function init(file) {
  return GoogleStorage.file(file);
}

/**
 * Handle get all file
 * @returns
 */
async function getFile(options) {
  return await GoogleStorage.getFiles(options);
}

module.exports = {
  init,
  getFile,
};
