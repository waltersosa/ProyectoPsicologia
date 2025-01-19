import { apiConfig, getAuthHeaders, getApiUrl } from './config';

const authService = {
  async login(email, password) {
    try {
      const response = await fetch(getApiUrl('/api/users/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guarda al usuario completo
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch(getApiUrl('/api/users/register'), {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      // Guardar el token si se proporciona en el registro
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario registrado
      }

      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  async updateProfile(userData) {
    try {
      const response = await fetch(getApiUrl('/users/profile'), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el perfil');
      }

      // Actualizar el usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
  },
};

export default authService;
