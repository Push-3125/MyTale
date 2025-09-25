const { Story, Chapter, User } = require('../models');
const { Op } = require('sequelize');

const list = async (req, res) => {
  try {
    const where = {};
    if (req.query.genre) where.genre = req.query.genre;
    if (req.query.tag) where.tags = { [Op.like]: `%${req.query.tag}%` };
    const stories = await Story.findAll({ where, include: [{ model: User, attributes: ['id','username','display_name'] }] });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const search = async (req, res) => {
  try {
    const q = req.query.q || '';
    const stories = await Story.findAll({ where: { [Op.or]: [ { title: { [Op.like]: `%${q}%` } }, { description: { [Op.like]: `%${q}%` } } ] } });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, genre, tags } = req.body;
    const story = await Story.create({ title, description, genre, tags, author_id: req.user.id, status: 'pending' });
    res.status(201).json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const get = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id, { include: [{ model: Chapter }, { model: User, attributes: ['id','username'] }] });
    if (!story) return res.status(404).json({ message: 'Not found' });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) return res.status(404).json({ message: 'Not found' });
    if (story.author_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { title, description, genre, tags, status } = req.body;
    Object.assign(story, { title, description, genre, tags, status });
    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) return res.status(404).json({ message: 'Not found' });
    if (story.author_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await story.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const chapters = async (req, res) => {
  try {
    const chs = await Chapter.findAll({ where: { story_id: req.params.id }, order: [['chapter_index','ASC']] });
    res.json(chs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { list, search, create, get, update, remove, chapters };
