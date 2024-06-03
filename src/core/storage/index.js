const { Storage } = require('@google-cloud/storage');
const config = require('../config');
const storage = new Storage({
  projectId: config.google_auth.projectID,
  credentials: {
    client_email: config.google_auth.bucketClientEmail,
    private_key: config.google_auth.bucketPrivateKey,
  },
});
const GoogleStorage = storage.bucket(config.google_auth.bucketName);

module.exports = GoogleStorage;
