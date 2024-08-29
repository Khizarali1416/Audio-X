const express = require('express');
const router = express.Router();
const AudioController = require('../controllers/audioController');
const userAuth = require('../middlewares/authenticate')
const {upload} = require('../config/multer')
// Multer setup for file upload

// Upload audio route
router.post('/create',userAuth,upload, AudioController.uploadAudio);
// router.post('/',authenticate, imageUpload.single('imageFile'), AudioController.uploadImage);

// Get audio details
router.get('/:id',userAuth, AudioController.getAudioDetails);

// List all audios or apply filters if needed
router.get('/', AudioController.listAudios);

module.exports = router;
