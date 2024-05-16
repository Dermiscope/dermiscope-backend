const { v4: uuid } = require('uuid');

/**
 * Handle Generate UUID
 * @returns {string}
 */
function GenerateID() {
  return uuid();
}

module.exports = GenerateID;
