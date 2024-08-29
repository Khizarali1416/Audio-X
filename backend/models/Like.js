const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
    required: true,
  },
  liked: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
