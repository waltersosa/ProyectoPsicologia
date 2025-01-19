const progressModel = require('../models/progressModel');

const progressController = {
  async getProgress(req, res) {
    try {
      const userId = req.user.id; // Obtener el ID del usuario autenticado
      console.log('Obteniendo progreso para el usuario:', userId);

      const progress = await progressModel.getProgress(userId);

      if (!progress.length) {
        return res.status(404).json({ error: 'No se encontró progreso para este usuario.' });
      }

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

      console.log('Actualizando progreso:', { userId, gameCategory, level });

      // Validar entradas
      if (!gameCategory || typeof level !== 'number') {
        return res.status(400).json({ error: 'Datos inválidos' });
      }

      const updatedProgress = await progressModel.updateProgress(userId, gameCategory, level);

      console.log('Progreso actualizado:', updatedProgress);
      res.json(updatedProgress);
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
      res.status(500).json({ error: 'Error al actualizar el progreso' });
    }
  },
};

module.exports = progressController;
