const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

// Rutas para obtener y actualizar progreso
router.get('/', auth, progressController.getProgress);
router.post('/', auth, progressController.updateProgress);

module.exports = router; 