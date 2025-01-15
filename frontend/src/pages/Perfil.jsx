import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Save, User } from 'lucide-react';
import authService from '../services/authService';

function Perfil() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        avatar: userData.avatar || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await authService.updateProfile(formData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('Perfil actualizado exitosamente');
    } catch (error) {
      setError(error.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="h-24 w-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-blue-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Mi Perfil</h2>
          <p className="mt-2 text-gray-600">
            Gestiona tu información personal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email (solo lectura) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              readOnly
              className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-gray-600"
            />
          </div>

          {/* Rol (solo lectura) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <div className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-gray-50 text-gray-600">
              {user.role === 'admin' ? 'Administrador' : 'Usuario'}
            </div>
          </div>

          {/* Mensajes de error y éxito */}
          {error && (
            <div className="text-center text-sm text-red-600">
              <AlertCircle className="inline-block w-4 h-4 mr-1" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-center text-sm text-green-600">
              <Save className="inline-block w-4 h-4 mr-1" />
              {success}
            </div>
          )}

          {/* Botón de guardar */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⚪</span>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar cambios
              </>
            )}
          </button>
        </form>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Información de la cuenta</h3>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Miembro desde</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Última actualización</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.updated_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </div>
  );
}

export default Perfil;