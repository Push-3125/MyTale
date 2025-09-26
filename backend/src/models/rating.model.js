const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  storyId: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);