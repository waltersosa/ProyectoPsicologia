import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

function EmotionDetector({ onGameComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0); // Controlador de las preguntas
  const [score, setScore] = useState(0); // Contador de respuestas correctas
  const [isGameCompleted, setIsGameCompleted] = useState(false); // Estado para saber si el juego fue completado
  const navigate = useNavigate(); // Usamos el hook useNavigate

  // Las preguntas del juego, con sus emojis, respuestas correctas y opciones
  const emotions = [
    { emoji: '😊', correctAnswer: 'Feliz' },
    { emoji: '😢', correctAnswer: 'Triste' },
    { emoji: '😡', correctAnswer: 'Enojado' },
    { emoji: '😍', correctAnswer: 'Amor' },
    { emoji: '😎', correctAnswer: 'Cool' },
  ];

  const shuffleOptions = (correctAnswer) => {
    const allOptions = [...emotions.map((e) => e.correctAnswer), correctAnswer];
    return allOptions.sort(() => Math.random() - 0.5); // Barajamos las opciones aleatoriamente
  };

  // Función para manejar cuando el jugador elige una opción
  const handleOptionSelect = (emotion) => {
    if (emotion === emotions[questionIndex].correctAnswer) {
      setScore(score + 1); // Si la respuesta es correcta, incrementa el score
    }

    if (questionIndex < emotions.length - 1) {
      setQuestionIndex(questionIndex + 1); // Pasa a la siguiente pregunta
    } else {
      setIsGameCompleted(true); // Si se han completado todas las preguntas
    }
  };

  // Función para reiniciar el juego y volver al inicio
  const handleResetGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setIsGameCompleted(false);
    onGameComplete(); // Notifica que se completó el juego
    navigate('/'); // Redirige al inicio de la aplicación
  };

  // Función para volver a la actividad (redirige al inicio de la aplicación)
  const handleBackToActivity = () => {
    navigate('/'); // Redirige a la página principal (inicio)
  };

  // Barajamos las emociones y las opciones antes de mostrar
  const currentEmotion = emotions[questionIndex];
  const options = shuffleOptions(currentEmotion.correctAnswer);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto text-center"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Juego de Emociones</h1>
      <p className="text-xl text-gray-600 mb-8">
        Selecciona la emoción correcta para cada emoji
      </p>

      {/* Si el juego no ha terminado, muestra las preguntas y las opciones */}
      {!isGameCompleted ? (
        <div className="mt-8">
          <div className="text-6xl mb-6">{currentEmotion.emoji}</div>
          <p className="text-2xl mb-4">¿Qué emoción representa este emoji?</p>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-2xl font-bold mb-4">
            ¡Juego completado! Tu puntuación es: {score} de {emotions.length}
          </p>
          {/* Mostrar botón para volver a la actividad */}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4"
            onClick={handleBackToActivity}
          >
            Volver a la actividad
          </button>
          {/* Mostrar botón para reiniciar el juego */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-4 ml-4"
            onClick={handleResetGame}
          >
            Volver a Jugar
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default EmotionDetector;
