const express = require('express');
const router = express.Router({ mergeParams: true });
const ctrl = require('../controllers/chaptersController');
const auth = require('../utils/authMiddleware');

router.post('/', auth, ctrl.create);
router.put('/:chapterId', auth, ctrl.update);
router.delete('/:chapterId', auth, ctrl.remove);

module.exports = router;
