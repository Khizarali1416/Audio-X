const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  filePath: {
    type: String,
    required: true,
    trim: true,
  },
  imagePath: {
    type: String,
    trim: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
