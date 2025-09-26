const express = require('express');
const router = express.Router();
const Rating = require('../models/rating.model');

router.post('/', async (req, res) => {
  const { storyId, userId, rating } = req.body;
  try {
    let existing = await Rating.findOne({ storyId, userId });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: 'Đã cập nhật đánh giá' });
    }
    const newRating = new Rating({ storyId, userId, rating });
    await newRating.save();
    res.json({ message: 'Đã lưu đánh giá' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu đánh giá' });
  }
});

router.get('/:storyId', async (req, res) => {
  try {
    const ratings = await Rating.find({ storyId: req.params.storyId });
    const avg = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;
    res.json({ average: avg.toFixed(1), count: ratings.length });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy đánh giá' });
  }
});

module.exports = router;