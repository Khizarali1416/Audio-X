const multer = require('multer');
const path = require('path');

// Storage configuration for audio files
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'audioFile') {
        cb(null, 'uploads/audio');
      } else if (file.fieldname === 'imageFile') {
        cb(null, 'uploads/images');
      } else {
        cb(new Error('Invalid field name'), false);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'audioFile' && file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else if (file.fieldname === 'imageFile' && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
}).fields([{ name: 'audioFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]);


module.exports = {
  upload
};
