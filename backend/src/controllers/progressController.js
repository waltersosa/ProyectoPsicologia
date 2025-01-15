const progressModel = require('../models/progressModel');

const progressController = {
  async getProgress(req, res) {
    try {
      const userId = req.user.id;
      console.log('Getting progress for user:', userId);
      const progress = await progressModel.getProgress(userId);
      console.log('Progress found:', progress);
      res.json(progress);
    } catch (error) {
      console.error('Error al obtener progreso:', error);
      res.status(500).json({ error: 'Error al obtener el progreso' });
    }
  },

  async updateProgress(req, res) {
    try {
      const userId = req.user.id;
      const { gameCategory, level } = req.body;
      
      console.log('Updating progress:', { userId, gameCategory, level });

      const updatedProgress = await progressModel.updateProgress(
        userId,
        gameCategory,
        level
      );

      console.log('Progress updated:', updatedProgress);
      res.json(updatedProgress);
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
      res.status(500).json({ error: 'Error al actualizar el progreso' });
    }
  }
};

module.exports = progressController; 