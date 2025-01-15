const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.get('/', auth, progressController.getProgress);
router.post('/', auth, progressController.updateProgress);

module.exports = router; 