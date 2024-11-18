import React, { useState } from 'react';
import Avataaars from 'avataaars';

const Avatar = () => {
  // Estado para controlar las opciones de personalización del avatar
  const [avatarOptions, setAvatarOptions] = useState({
    topType: 'ShortHairDreads01', // Cabello para hombre por defecto
    hairColor: 'BrownDark',
    facialHairType: 'BeardMedium', // Por defecto con barba
    facialHairColor: 'Brown',
    clotheType: 'ShirtCrewNeck', // Camiseta por defecto
    clotheColor: 'Gray',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
    gender: 'male', // Género masculino por defecto
    backgroundColor: 'Transparent',
  });

  // Función para manejar los cambios de personalización
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvatarOptions(prev => ({
      ...prev,
      [name]: value,
    }));

    // Cambiar avatar en base al género
    if (name === 'gender') {
      if (value === 'female') {
        setAvatarOptions(prev => ({
          ...prev,
          topType: 'LongHairStraight',
          facialHairType: 'NoBeard', // Sin barba para femenino
        }));
      } else {
        setAvatarOptions(prev => ({
          ...prev,
          topType: 'ShortHairDreads01',
          facialHairType: 'BeardMedium', // Con barba para masculino
        }));
      }
    }
  };

  // Función para manejar la opción de quitar la barba
  const handleFacialHairToggle = (e) => {
    const { checked } = e.target;
    setAvatarOptions(prev => ({
      ...prev,
      facialHairType: checked ? 'BeardMedium' : 'NoBeard', // Activar o desactivar la barba
    }));
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-2xl shadow-xl w-full md:w-3/4 lg:w-2/3 mx-auto">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Crea y Personaliza tu Avatar</h1>

      {/* Mostrar el avatar */}
      <div className="flex justify-center items-center w-full mb-6">
        <div className="bg-white p-6 rounded-full shadow-lg">
          <Avataaars {...avatarOptions} className="w-72 h-72" />
        </div>
      </div>

      {/* Contenedor de opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* Opción de género */}
        <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Género</h2>
          <div>
            <label className="block text-gray-600">Selecciona el género</label>
            <select
              name="gender"
              onChange={handleChange}
              value={avatarOptions.gender}
              className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        {/* Opción de cabello */}
        <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Cabello</h2>
          <div>
            <label className="block text-gray-600">Tipo de Cabello</label>
            <select
              name="topType"
              onChange={handleChange}
              value={avatarOptions.topType}
              className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ShortHairDreads01">Dreads Cortos</option>
              <option value="LongHairStraight">Cabello Largo</option>
              <option value="ShortHairShaggy">Cabello Corto</option>
              <option value="Hat">Sombrero</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Color de Cabello</label>
            <select
              name="hairColor"
              onChange={handleChange}
              value={avatarOptions.hairColor}
              className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="BrownDark">Castaño Oscuro</option>
              <option value="Blonde">Rubio</option>
              <option value="Black">Negro</option>
              <option value="Auburn">Castaño</option>
            </select>
          </div>
        </div>

        {/* Opción de barba */}
        {avatarOptions.gender === 'male' && (
          <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Barba</h2>
            <div>
              <label className="block text-gray-600">¿Quieres barba?</label>
              <input
                type="checkbox"
                checked={avatarOptions.facialHairType === 'BeardMedium'}
                onChange={handleFacialHairToggle}
                className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}

        {/* Opción de ropa y accesorios */}
        <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Ropa y Accesorios</h2>
          <div>
            <label className="block text-gray-600">Tipo de Ropa</label>
            <select
              name="clotheType"
              onChange={handleChange}
              value={avatarOptions.clotheType}
              className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ShirtCrewNeck">Camiseta Cuello Redondo</option>
              <option value="ShirtVNeck">Camiseta Cuello V</option>
              <option value="Hoodie">Sudadera</option>
              <option value="Blazer">Blazer</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Color de Ropa</label>
            <select
              name="clotheColor"
              onChange={handleChange}
              value={avatarOptions.clotheColor}
              className="mt-2 p-3 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Gray">Gris</option>
              <option value="Red">Rojo</option>
              <option value="Blue">Azul</option>
              <option value="Black">Negro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botón para guardar */}
      <div className="mt-8 w-full flex justify-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Guardar Avatar
        </button>
      </div>
    </div>
  );
};

export default Avatar;
