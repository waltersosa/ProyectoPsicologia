import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importar los iconos

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-8">
          {/* Información principal */}
          <div className="text-gray-300 mb-4 md:mb-0">
            <p>© 2024 EmoRegula</p>
            <p className="text-sm">Desarrollado para ayudar a regular emociones</p>
          </div>

          {/* Navegación secundaria */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition duration-150"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition duration-150"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition duration-150"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-8 text-2xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-600 transition duration-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 transition duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-600 transition duration-200"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
