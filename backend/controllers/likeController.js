const Like = require('../models/Like');
const Audio = require('../models/Audio')

exports.toggleLike = async (req, res) => {
  const { audioId } = req.body;
  const userId = req.user._id;

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({ user: userId, audio: audioId });

    if (existingLike) {
      // If like exists, remove it (unlike)
      await Like.deleteOne({ _id: existingLike._id });

      // Decrement the like count in the Audio model
      const updatedAudio = await Audio.findByIdAndUpdate(audioId, { $inc: { likes: -1 } }, { new: true });

      return res.status(200).json({ success: true, liked: false, likeCount: updatedAudio.likes, message: 'Audio unliked successfully' });
    } else {
      // If like does not exist, create a new one (like)
      const newLike = new Like({ user: userId, audio: audioId });
      await newLike.save();

      // Increment the like count in the Audio model
      const updatedAudio = await Audio.findByIdAndUpdate(audioId, { $inc: { likes: 1 } }, { new: true });

      return res.status(200).json({ success: true, liked: true, likeCount: updatedAudio.likes, message: 'Audio liked successfully' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Get list of audios liked by a specific user
exports.getUserLikedAudios = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all liked posts by the user
    const likedPosts = await Like.find({ user: userId }).populate('audio');

    // Extract audio data
    const audioPosts = likedPosts.map(like => like.audio);

    return res.status(200).json({
      success: true,
      posts: audioPosts
    });
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getLikeStatus = async (req, res) => {
  const { audioId } = req.params;
  const userId = req.user._id;

  try {
    // Check if the user has already liked the audio
    const existingLike = await Like.findOne({ user: userId, audio: audioId });

    // Get the total like count for the audio
    const audio = await Audio.findById(audioId);

    return res.status(200).json({
      success: true,
      isLiked: !!existingLike,
      likeCount: audio.likes,
    });
  } catch (error) {
    console.error('Error fetching like status:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

