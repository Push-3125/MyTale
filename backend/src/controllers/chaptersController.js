const { Chapter, Story } = require('../models');

const create = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.storyId);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    if (story.author_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { title, content, chapter_index } = req.body;
    const ch = await Chapter.create({ story_id: story.id, title, content, chapter_index });
    res.status(201).json(ch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const ch = await Chapter.findByPk(req.params.chapterId);
    if (!ch) return res.status(404).json({ message: 'Chapter not found' });
    const story = await Story.findByPk(ch.story_id);
    if (story.author_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { title, content, chapter_index } = req.body;
    Object.assign(ch, { title, content, chapter_index });
    await ch.save();
    res.json(ch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    const ch = await Chapter.findByPk(req.params.chapterId);
    if (!ch) return res.status(404).json({ message: 'Chapter not found' });
    const story = await Story.findByPk(ch.story_id);
    if (story.author_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await ch.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { create, update, remove };
