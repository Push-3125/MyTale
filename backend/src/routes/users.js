const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../utils/authMiddleware');

router.get('/:id', usersController.getUser);
router.put('/:id', auth, usersController.updateUser);

module.exports = router;
