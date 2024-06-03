const config = require('../../../core/config');
const FileRepository = require('./file-repository');
const { errorTypes } = require('../../../core/errors');
const { ApiError } = require('@google-cloud/storage');

/**
 * Handle get files where prefix
 * @param {string} filename Filename
 * @returns
 */
async function getByPrefix(filename) {
  try {
    const [files] = await FileRepository.getFile({
      prefix: filename,
    });
    return files.map((file) => ({
      ...file.metadata,
      publicUrl: `https://storage.googleapis.com/${file.bucket.name}/${file.metadata.name}`,
    }));
  } catch (error) {
    throw error;
  }
}

/**
 * Handle Upload File With Stream
 * @param {object} file File
 * @param {string} destination Destination
 * @returns {object}
 */
async function uploadFileStream(file, destination) {
  const fileName = `${destination}/${Date.now()}-${file.originalname}`;
  const buffer = await FileRepository.init(fileName);
  const bufferStream = buffer.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    bufferStream.on('error', (err) => {
      reject(new Error(err));
    });

    bufferStream.on('finish', () => {
      const fileUploaded = {
        name: fileName,
        mimeType: file.mimetype,
        size: file.size,
        publicUrl: `https://storage.googleapis.com/${config.google_auth.bucketName}/${fileName}`,
      };
      resolve(fileUploaded);
    });

    bufferStream.end(file.buffer);
  });
}

/**
 * Handle store file
 * @param {object} request Request
 * @returns
 */
async function store(request) {
  try {
    const { detectionId = null, files } = request.body;

    let isResultDetection = true;
    if (detectionId) {
      const [folder] = await FileRepository.getFile({
        prefix: `detections/${detectionId}`,
      });
      if (!folder.length) isResultDetection = false;
    }

    let filesUploaded = [];
    const destinationFile =
      detectionId == null
        ? 'media'
        : isResultDetection
          ? `detections/${detectionId}/result`
          : `detections/${detectionId}`;

    for (const file of files) {
      const fileUploaded = await uploadFileStream(file, destinationFile);
      filesUploaded.push(fileUploaded);
    }
    return filesUploaded;
  } catch (error) {
    throw error;
  }
}

/**
 * Handle delete file
 * @param {string} filename Filename
 * @returns
 */
async function deleteFile(filename) {
  try {
    const file = await FileRepository.init(filename);
    await file.delete();
    return filename;
  } catch (error) {
    let message = '';
    if (error.code === 404) {
      message = `File ${filename} not found.`;
    } else {
      message = `Failed to delete file ${filename}`;
    }
    throw {
      errorType: errorTypes.NOT_FOUND,
      message,
    };
  }
}

module.exports = {
  getByPrefix,
  store,
  deleteFile,
};
