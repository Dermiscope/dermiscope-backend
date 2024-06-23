const { predictions } = require('../../../core/database/models');

/**
 * Repository Get One Prediction
 * @param {object} option Option
 * @returns
 */
async function getOne(option) {
  return await predictions.findOne({ where: option });
}
/**
 * Repository Get Where Prediction
 * @param {object} option Option
 * @returns
 */
async function getWhere(option) {
  return await predictions.findAll({
    where: option,
  });
}

/**
 * Repository Store Prediction
 * @param {object} payload Payload
 * @returns
 */
async function store(payload) {
  return await predictions.create(payload);
}

module.exports = { getOne, getWhere, store };
