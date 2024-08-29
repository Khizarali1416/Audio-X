const Audio = require('../models/Audio');




const uploadAudio = async (req, res) => {
  try {
    const { title } = req.body;
    const audioFile = req.files['audioFile'][0];
    const imageFile = req.files['imageFile'][0];

    if (!audioFile) {
      return res.status(400).json({ message: 'Audio file is required' });
    }

    if (!imageFile) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    
    const newAudio = new Audio({
      title,
      filePath: `/uploads/audio/${audioFile.filename}`,
      imagePath: `/uploads/images/${imageFile.filename}`,
      uploader: req.user._id
    });
    
    await newAudio.save();
    res.status(201).json({ message: 'Audio uploaded successfully', audio: newAudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Controller to get details of a specific audio
const getAudioDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const audio = await Audio.findById(id).populate('userId', 'name'); // Populate user details if needed

    if (!audio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    res.status(200).json({ audio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to list all audios or apply filters if needed
const listAudios = async (req, res) => {
  try {
    const audios = await Audio.find().populate('uploader', 'name'); // Populate user details if needed

    res.status(200).json({ audios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadAudio,
  
  getAudioDetails,
  listAudios
};
