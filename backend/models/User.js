const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [{ token: { type: String, required: true } }],
  uploadedAudios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
  }],
  likedAudios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
