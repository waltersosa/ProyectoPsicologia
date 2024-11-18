import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai'; // Para el icono de editar
import { MdOutlinePhotoCamera } from 'react-icons/md'; // Para cambiar la foto de perfil
import { motion } from 'framer-motion';

function Perfil() {
  const [user, setUser] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@correo.com',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', // Logo de React
    country: 'México',
    city: 'Ciudad de México',
    phone: '+52 123 456 7890',
    profession: 'Desarrollador Frontend',
  });

  const [newAvatar, setNewAvatar] = useState(user.avatar);

  const handleChangeAvatar = () => {
    const newImage = prompt('Introduce la URL de la nueva imagen:');
    if (newImage) {
      setNewAvatar(newImage);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-start space-x-6">
        {/* Foto de perfil */}
        <div className="relative">
          <img
            src={newAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-indigo-500 shadow-md"
          />
          <button
            onClick={handleChangeAvatar}
            className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-1 hover:bg-indigo-600 transition-transform transform hover:scale-110"
          >
            <MdOutlinePhotoCamera className="text-xs" />
          </button>
        </div>

        {/* Datos principales */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-sm">{user.profession}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <button
            className="bg-indigo-500 text-white py-1 px-3 rounded-lg flex items-center space-x-2 text-sm"
            onClick={() => alert('Editando perfil...')}
          >
            <AiOutlineEdit className="text-sm" />
            <span>Editar</span>
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Ciudad:</span>
          <span className="text-gray-800">{user.city}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>País:</span>
          <span className="text-gray-800">{user.country}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Teléfono:</span>
          <span className="text-gray-800">{user.phone}</span>
        </div>
      </div>

      <button
        onClick={() => alert('Editando información adicional...')}
        className="bg-indigo-500 text-white py-1 px-3 rounded-lg mt-6 text-sm w-full"
      >
        <AiOutlineEdit className="text-sm" />
        <span>Editar Información</span>
      </button>
    </motion.div>
  );
}

export default Perfil;
