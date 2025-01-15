const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Rutas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rutas autenticadas
router.put('/profile', auth, userController.updateProfile);

// Rutas de administrador
router.get('/users', auth, isAdmin, userController.getAllUsers);
router.delete('/users/:id', auth, isAdmin, userController.deleteUser);

module.exports = router; 