const express = require('express');
const router = express.Router();
const stories = require('../controllers/storiesController');
const auth = require('../utils/authMiddleware');

router.get('/', stories.list);
router.get('/search', stories.search);
router.post('/', auth, stories.create);
router.get('/:id', stories.get);
router.put('/:id', auth, stories.update);
router.delete('/:id', auth, stories.remove);
router.get('/:id/chapters', stories.chapters);

module.exports = router;
