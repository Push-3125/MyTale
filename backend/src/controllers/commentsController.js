const { Comment, Story, Chapter } = require('../models');

const listForStory = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { story_id: req.params.storyId } });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const create = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { chapterId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({ user_id: req.user.id, story_id: storyId || null, chapter_id: chapterId || null, content });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    const c = await Comment.findByPk(req.params.commentId);
    if (!c) return res.status(404).json({ message: 'Not found' });
    if (c.user_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await c.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { listForStory, create, remove };
