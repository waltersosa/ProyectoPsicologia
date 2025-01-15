import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importar los iconos

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Información principal */}
        <div className="border-b border-gray-700 pb-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl font-bold text-gray-100 mb-2">
                © 2024 EmoRegula
              </h1>
              <p className="text-sm text-gray-400">
                Desarrollado para ayudar a regular emociones
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-100 transition duration-150"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-100 transition duration-150"
              >
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-100 transition duration-150"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition duration-300 transform hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-600 transition duration-300 transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Notas al pie */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>
            Este proyecto fue diseñado con amor y dedicación. Todas las
            imágenes y contenido pertenecen a sus respectivos autores.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
