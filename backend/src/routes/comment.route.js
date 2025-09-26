const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');

router.post('/', async (req, res) => {
  const { storyId, userId, content } = req.body;
  try {
    const comment = new Comment({ storyId, userId, content });
    await comment.save();
    res.json({ message: 'Đã thêm bình luận' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi gửi bình luận' });
  }
});

router.get('/:storyId', async (req, res) => {
  try {
    const comments = await Comment.find({ storyId: req.params.storyId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy bình luận' });
  }
});

module.exports = router;