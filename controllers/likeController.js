const Like = require('../models/likeModel');

exports.toggleLike = async (req, res) => {
  const { profileId, type, contentId } = req.body;
  try {
    const existing = await Like.findOne({ profileId, contentType: type, contentId });
    if (existing) {
      await existing.deleteOne();
      return res.json({ liked: false });
    } else {
      const like = await Like.create({ profileId, contentType: type, contentId });
      return res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
