const uuid = require('../../../utils/uuid');
const PredictionRepository = require('./prediction-repository');
const FileService = require('../file/file-service');
const UserService = require('../user/user-service');
const { errorTypes } = require('../../../core/errors');
const { isUUID } = require('validator');
const axios = require('axios');
const config = require('../../../core/config');
const { verifyAccessToken } = require('../../../utils/token');

/**
 * Function Split Result Detection
 * @param {object} detections Detections
 * @returns
 */
async function splitResultDetections(detections) {
  let faces = [];
  let faces_result = [];
  for (const result of detections) {
    if (!result.name.split('/').includes('result')) {
      faces.push(result);
    } else {
      faces_result.push(result);
    }
  }
  return { faces, faces_result };
}

/**
 * Service Get One Prediction
 * @param {object} option Option
 * @returns
 */
async function getOne(option) {
  try {
    if (!isUUID(option.id, 4))
      throw {
        errorType: errorTypes.BAD_REQUEST,
        message: 'You entered is not UUID',
      };

    const predictionData = await PredictionRepository.getOne(option);
    if (!predictionData) return {};

    const faceDetection = await FileService.getByPrefix(
      `detections/${predictionData.dataValues.id}`
    );
    const { faces, faces_result } = await splitResultDetections(faceDetection);

    return {
      ...predictionData.dataValues,
      faces,
      faces_result,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Service Get Prediction By ID User
 * @param {string} id ID User
 * @returns
 */
async function getAllByUser(id_user) {
  try {
    return await PredictionRepository.getOne({ id_user });
  } catch (error) {
    throw error;
  }
}

/**
 * Service Get Prediction on Machine Learning Server
 * @param {string} detectionId Detection ID
 * @param {object} payload Payload
 * @returns
 */
async function getPrediction(detectionId, payload) {
  try {
    const { data } = await axios.post(
      `${config.ml_base_url}/predictions`,
      {
        id: detectionId,
        faces: payload,
      },
      {
        timeout: 600000,
      }
    );

    return {
      type: data.type || 'Unknown',
      accuration: data.accuration || 0,
      faces_result: data.faces_result || [],
      treatment: data.treatment || '',
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Service Prediction
 * @param {string} token Token
 * @param {object} payload Payload
 * @returns
 */
async function prediction(token, payload) {
  try {
    // Generate ID Detection
    const ID = uuid();

    // Get Valid Token For Get Email data
    const tokenData = verifyAccessToken(token);
    const user = await UserService.getOne({
      email: tokenData.email,
    });
    if (!user) return [];

    // Upload Face No Detection
    const faceUploaded = await FileService.store({
      body: {
        detectionId: ID,
        files: payload.files,
      },
    });

    // Predict Face On Machine Learning Server
    const detectionResult = await getPrediction(ID, faceUploaded);

    // Store To Database
    await PredictionRepository.store({
      id: ID,
      id_user: user.dataValues.id_google,
      type: detectionResult.type,
      accuration: detectionResult.accuration,
      treatment: detectionResult.treatment,
      thumbnail: faceUploaded[0]['publicUrl'],
    });

    return {
      id: ID,
      type: detectionResult.type,
      accuration: detectionResult.accuration,
      faces: faceUploaded,
      faces_result: detectionResult.faces_result,
      treatment: detectionResult.treatment,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { getOne, getAllByUser, prediction };
