import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import authService from '../services/authService';

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@pucese\.edu\.ec$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setEmailError('Por favor, utiliza un correo institucional (@pucese.edu.ec)');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('Intentando login con:', {
        email: formData.email,
        password: formData.password
      });

      const response = await authService.login(formData.email, formData.password);
      console.log('Respuesta del servidor:', response);
      
      onLogin(response.user);
      navigate('/');
    } catch (error) {
      console.error('Error completo:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar mensaje de error cuando el usuario comienza a escribir
    if (name === 'email') {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl"
      >
        {/* Logo y título */}
        <div className="text-center">
          <div className="text-6xl mb-4">🌈</div>
          <h2 className="text-3xl font-bold text-gray-800">Emotion Play</h2>
          <p className="mt-2 text-gray-600">
            Inicia sesión para continuar tu viaje emocional
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Campo de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico institucional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="usuario@pucese.edu.ec"
              />
              {emailError && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {emailError}
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Solo se permiten correos con dominio @pucese.edu.ec
              </p>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Recordar y olvidé contraseña */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-600">
                Recordarme
              </label>
            </div>
            <button type="button" className="text-blue-500 hover:text-blue-600">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          {/* Enlace de registro */}
          <div className="text-center text-sm">
            <span className="text-gray-600">¿No tienes una cuenta? </span>
            <button type="button" className="text-blue-500 hover:text-blue-600 font-medium">
              Regístrate aquí
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-2 text-center text-sm text-red-600">
            <AlertCircle className="inline-block w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Login; 