import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserAlt, FaAward, FaImage } from 'react-icons/fa'; // Añadido FaImage para el Avatar
import { LogOut, User, ChevronDown } from 'lucide-react'; // Importa el ícono de logout
import authService from '../services/authService';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName'); // Recupera el nombre del usuario

  const handleLogout = () => {
    authService.logout();
    onLogout(); // Notifica al App.jsx
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl mr-2">🌈</span>
              <span className="font-bold text-xl text-gray-800">Emotion Play</span>
            </Link>
          </div>

          {/* Menú grande */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md flex items-center">
              <FaHome className="mr-1" /> {/* Icono de Inicio */}
              Inicio
            </Link>
            <Link
              to="/certificados"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md flex items-center"
            >
              <FaAward className="mr-1" /> {/* Icono de Certificados */}
              Mis Certificados
            </Link>
            <Link to="/perfil" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md flex items-center">
              <FaUserAlt className="mr-1" /> {/* Icono de Perfil */}
              {userName || 'Mi Perfil'} {/* Muestra el nombre del usuario o 'Mi Perfil' */}
            </Link>
            <Link to="/avatar" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md flex items-center">
              <FaImage className="mr-1" /> {/* Icono de Avatar */}
              Avatar
            </Link>
          </div>

          {/* Botón para menú móvil */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-900 focus:outline-none"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} // Mejora de accesibilidad
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menú de usuario */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <User className="w-6 h-6" />
                <span>{userName || 'Usuario'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Menú desplegable */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => navigate('/perfil')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link
            to="/"
            className="block text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center"
            onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic
          >
            <FaHome className="mr-1" /> {/* Icono de Inicio */}
            Inicio
          </Link>
          <Link
            to="/certificados"
            className="block text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center"
            onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic
          >
            <FaAward className="mr-1" /> {/* Icono de Certificados */}
            Mis Certificados
          </Link>
          <Link
            to="/perfil"
            className="block text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center"
            onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic
          >
            <FaUserAlt className="mr-1" /> {/* Icono de Perfil */}
            Mi Perfil
          </Link>
          <Link
            to="/avatar"
            className="block text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center"
            onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic
          >
            <FaImage className="mr-1" /> {/* Icono de Avatar */}
            Avatar
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
