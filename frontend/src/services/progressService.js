import { getApiUrl } from './config';

const progressService = {
  async getProgress() {
    try {
      const response = await fetch(getApiUrl('/api/progress'), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el progreso');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getProgress:', error);
      throw error;
    }
  },

  async updateProgress(gameCategory, level) {
    try {
      const response = await fetch(getApiUrl('/api/progress'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ gameCategory, level }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el progreso');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en updateProgress:', error);
      throw error;
    }
  },
};

export default progressService;
