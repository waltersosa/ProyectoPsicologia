import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Emotion {
  id: string;
  src: string;
}

const emotions: Emotion[] = [
  { id: "felicidad", src: "/src/games/ComprensionEmocional/Nivel3/images/felicidad.jpg" },
  { id: "tristeza", src: "/src/games/ComprensionEmocional/Nivel3/images/tristeza.jpg" },
  { id: "confusion", src: "/src/games/ComprensionEmocional/Nivel3/images/confusion.jpg" },
  { id: "desagrado", src: "/src/games/ComprensionEmocional/Nivel3/images/desagrado.jpg" },
  { id: "ira", src: "/src/games/ComprensionEmocional/Nivel3/images/ira.png" },
  { id: "temor", src: "/src/games/ComprensionEmocional/Nivel3/images/temor.png" },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ReconocerEmociones3: React.FC = () => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isGameComplete) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isGameComplete]);

  useEffect(() => {
    loadNextEmotion();
  }, [currentEmotionIndex]);

  const loadNextEmotion = () => {
    if (currentEmotionIndex < emotions.length) {
      const currentEmotion = emotions[currentEmotionIndex];
      const incorrectOptions = emotions
        .filter((emotion) => emotion.id !== currentEmotion.id)
        .map((emotion) => emotion.id);
      const randomIncorrectOptions = shuffleArray(incorrectOptions).slice(0, 2);
      setOptions(shuffleArray([currentEmotion.id, ...randomIncorrectOptions]));
    } else {
      setIsGameComplete(true);
    }
  };

  const handleOptionClick = (selectedOption: string) => {
    const currentEmotion = emotions[currentEmotionIndex];
    const isCorrect = selectedOption === currentEmotion.id;
    setResults((prevResults) => [
      ...prevResults,
      { id: currentEmotion.id, correct: isCorrect },
    ]);
    if (currentEmotionIndex + 1 < emotions.length) {
      setCurrentEmotionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsGameComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentEmotionIndex(0);
    setIsGameComplete(false);
    setTime(0);
    setResults([]);
    loadNextEmotion();
  };

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Título del juego */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Identificación de Escenarios y Emociones
      </h1>

      {/* Cronómetro */}
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-700">Tiempo</p>
          <p className="text-2xl font-bold text-blue-500">{time} s</p>
        </div>
      </div>

      {!isGameComplete && (
        <>
          {/* Imagen principal */}
          <div className="w-80 h-80 border-4 border-gray-400 rounded-lg mb-6">
            <img
              src={emotions[currentEmotionIndex].src}
              alt="Emoción"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <button
                key={option}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                onClick={() => handleOptionClick(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </>
      )}

      {isGameComplete && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades!</h2>
          <p className="text-lg text-gray-800">
            Has completado el juego en {time} segundos.
          </p>
          <div className="mt-6 text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Resultados:
            </h3>
            <ul className="list-disc ml-6">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`text-lg ${
                    result.correct ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.correct
                    ? `Correcto: ${result.id.charAt(0).toUpperCase() + result.id.slice(1)}`
                    : `Incorrecto: ${result.id.charAt(0).toUpperCase() + result.id.slice(1)}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              onClick={restartGame}
            >
              Jugar otra vez
            </button>
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
              onClick={() => navigate("/")}
            >
              Regresar al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReconocerEmociones3;
