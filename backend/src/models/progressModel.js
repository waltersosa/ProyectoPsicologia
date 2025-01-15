const pool = require('../config/database');

const progressModel = {
  async getProgress(userId) {
    const query = `
      SELECT game_category, level_completed, completed_at
      FROM user_progress
      WHERE user_id = $1
    `;
    try {
      const result = await pool.query(query, [userId]);
      console.log('Progreso obtenido:', result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error en getProgress:', error);
      throw error;
    }
  },

  async updateProgress(userId, gameCategory, level) {
    console.log('Intentando actualizar progreso:', { userId, gameCategory, level });
    const query = `
      INSERT INTO user_progress (user_id, game_category, level_completed)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, game_category)
      DO UPDATE SET 
        level_completed = GREATEST(user_progress.level_completed, EXCLUDED.level_completed),
        completed_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [userId, gameCategory, level]);
      console.log('Progreso actualizado:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error en updateProgress:', error);
      throw error;
    }
  }
};

module.exports = progressModel; 