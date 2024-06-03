const multer = require('multer');
const Storage = multer({
  storage: multer.memoryStorage(),
  limits: { fields: 5, fileSize: 10 * 1024 * 1024 },
});

module.exports = Storage;
