import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { getApiUrl } from "../../../services/config";

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
  const [results, setResults] = useState<{ id: string; selected: string; correct: boolean }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameStarted && !isGameComplete) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else if (timer) {
      clearInterval(timer);
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
      setGameStarted(false);
      sendGameProgress();
    }
  }, [currentEmotionIndex]);

  useEffect(() => {
    if (gameStarted) {
      loadNextEmotion();
    }
  }, [currentEmotionIndex, gameStarted, loadNextEmotion]);

  const sendGameProgress = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("Enviando progreso para usuario:", userId);

      const response = await fetch(getApiUrl("/api/progress"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gameCategory: "Comprensión Emocional",
          level: 3,
          timeTaken: time,
          results,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar progreso");
      }

      console.log("Progreso enviado nivel 3:", {
        gameCategory: "Comprensión Emocional",
        level: 3,
        timeTaken: time,
        results,
      });
    } catch (error) {
      console.error("Error al enviar progreso:", error);
    }
  };

  const handleOptionClick = (selectedOption: string) => {
    if (!gameStarted) return;

    const currentEmotion = emotions[currentEmotionIndex];
    const isCorrect = selectedOption === currentEmotion.id;

    setResults((prevResults) => [
      ...prevResults,
      { id: currentEmotion.id, selected: selectedOption, correct: isCorrect },
    ]);

    setCurrentEmotionIndex((prevIndex) => prevIndex + 1);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 flex flex-col justify-between h-[500px]">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-500" />
                Identificación de Escenarios y Emociones
              </h1>
              <div className="bg-blue-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-3">
                  ¿Cómo jugar?
                </h2>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>1. Observa las imágenes mostradas.</li>
                  <li>2. Selecciona la emoción correcta entre las opciones.</li>
                  <li>3. Completa todas las imágenes lo más rápido posible.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Tiempo</p>
                  <p className="text-xl font-bold text-green-700">{time} s</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-600 font-medium">
                    Imágenes restantes
                  </p>
                  <p className="text-xl font-bold text-purple-700">
                    {emotions.length - currentEmotionIndex}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={startGame}
              disabled={gameStarted}
              className={`w-full py-3 rounded-lg shadow transition font-semibold ${
                gameStarted
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Comenzar juego
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 flex flex-col h-[500px]">
            {isGameComplete ? (
              <div className="flex flex-col justify-center items-center h-full">
                <h2 className="text-4xl font-bold mb-4">¡Felicidades! 🎉</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Has completado el juego en <strong>{time} segundos</strong>.
                </p>
                <ul className="list-disc text-left text-gray-700 pl-6">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className={result.correct ? "text-green-600" : "text-red-600"}
                    >
                      {result.correct
                        ? `Correcto: ${result.id}`
                        : `Incorrecto: ${result.id} (Elegiste: ${result.selected})`}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={restartGame}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    Jugar otra vez
                  </button>
                  <button
                    onClick={() => navigate("/certificados")}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Obtener Certificado
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                  >
                    Regresar al inicio
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center mb-6">
                  <div className="w-72 h-72 border-2 border-gray-300 rounded-lg shadow-md">
                    <img
                      src={emotions[currentEmotionIndex]?.src}
                      alt="Emoción"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={!gameStarted}
                      className={`px-3 py-2 rounded-lg shadow-md transition ${
                        gameStarted
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Reconocer Emociones. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ReconocerEmociones3;
