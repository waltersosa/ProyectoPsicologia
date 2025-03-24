const progressModel = require('../models/progressModel');

const progressController = {
  async getProgress(req, res) {
    try {
      const userId = req.user.id; // Obtenido del middleware de autenticación
      const progress = await progressModel.getProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error('Error al obtener progreso:', error);
      res.status(500).json({ error: 'Error al obtener progreso' });
    }
  },

  async updateProgress(req, res) {
    try {
      const userId = req.user.id; // Obtenido del middleware de autenticación
      const { gameCategory, level } = req.body;
      const updatedProgress = await progressModel.updateProgress(userId, gameCategory, level);
      res.json(updatedProgress);
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
      res.status(500).json({ error: 'Error al actualizar progreso' });
    }
  }
};

module.exports = progressController;
