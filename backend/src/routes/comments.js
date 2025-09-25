const express = require('express');
const router = express.Router({ mergeParams: true });
const ctrl = require('../controllers/commentsController');
const auth = require('../utils/authMiddleware');

router.get('/', ctrl.listForStory);
router.post('/', auth, ctrl.create);
router.delete('/:commentId', auth, ctrl.remove);

module.exports = router;
