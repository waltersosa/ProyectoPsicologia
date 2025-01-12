import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

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
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const navigate = useNavigate();

  const imagePath = (emotion: string) =>
    new URL(`./images/${emotion.toLowerCase()}.jpg`, import.meta.url).href;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameStarted && !isGameComplete) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameStarted, isGameComplete]);

  const loadNextEmotion = useCallback(() => {
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
  }, [currentEmotionIndex]);

  useEffect(() => {
    if (gameStarted) {
      loadNextEmotion();
    }
  }, [currentEmotionIndex, gameStarted, loadNextEmotion]);

  const handleOptionClick = (selectedOption: string) => {
    if (!gameStarted) return;

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

  const startGame = () => {
    setGameStarted(true);
    setTime(0);
    setIsGameComplete(false);
    setResults([]);
    setCurrentEmotionIndex(0);
  };

  const restartGame = () => {
    setGameStarted(false);
    setTime(0);
    setIsGameComplete(false);
    setResults([]);
    setCurrentEmotionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <div className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de información */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-[500px] overflow-hidden">
            <div className="space-y-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                Reconocimiento de Emociones
              </h1>

              <div className="bg-blue-50 rounded-xl p-5 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-blue-800 mb-4">
                  ¿Cómo jugar?
                </h2>
                <ul className="space-y-2 text-sm lg:text-base text-gray-700">
                  <li>1. Observa la emoción de referencia</li>
                  <li>2. Haz clic en las opciones para seleccionar la emoción correcta</li>
                  <li>3. Completa todas las emociones lo más rápido posible</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 font-medium">Emociones restantes</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-700">{emotions.length - currentEmotionIndex}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium">Tiempo</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-700">{time}s</p>
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={gameStarted}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all ${
                  gameStarted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {gameStarted ? "Juego en progreso" : "Comenzar a jugar"}
              </button>
            </div>
          </div>

          {/* Columna del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col h-[600px] relative">
            <div className="bg-yellow-50 rounded-xl p-4 sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Palabras disponibles</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="word px-4 py-2 bg-gradient-to-br from-yellow-200 to-yellow-100 border-2 border-yellow-400 text-gray-800 font-semibold rounded-xl shadow-md cursor-grab hover:shadow-lg transition-all active:cursor-grabbing"
                    draggable={gameStarted}
                    data-word={emotion}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex-grow overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {emotions.map((emotion, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-3 bg-white p-4 rounded-lg shadow-md"
                    data-emotion={emotion}
                  >
                    <div className="w-full h-40 overflow-hidden rounded-lg">
                      <img
                        src={imagePath(emotion)}
                        alt={emotion}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="dropzone w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-center bg-gray-50 transition-colors hover:bg-gray-100"
                    >
                      Arrastra aquí
                    </div>
                    <p className="description text-sm text-gray-600 text-center h-12"></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isGameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-4xl font-bold mb-4">¡Felicidades! 🎉</h2>
            <p className="mb-6">Has completado el juego en <strong>{time} segundos</strong>.</p>
            <button onClick={restartGame} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all">Jugar otra vez</button>
            <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow ml-4 hover:bg-gray-600 transition-all">Volver al inicio</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Reconocer Emociones. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default ReconocerEmociones3;
