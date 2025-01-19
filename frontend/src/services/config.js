const API_URL = 'http://localhost:5000';

// Construye la URL completa para un endpoint específico
export const getApiUrl = (endpoint) => `${API_URL}${endpoint}`;

// Configuración general de la API
export const apiConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Función helper para incluir el token en las peticiones autenticadas
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...apiConfig.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
};
