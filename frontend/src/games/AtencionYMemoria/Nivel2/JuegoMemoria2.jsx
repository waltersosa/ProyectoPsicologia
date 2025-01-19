import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "pink", "lime"];

function JuegoMemoria2() {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingSequence, setShowingSequence] = useState(false);
  const [waitingForNextRound, setWaitingForNextRound] = useState(false);
  const [round, setRound] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const roundLengths = [3, 5, 7];

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setRound(1);
    setMistakes(0);
    setGameOver(false);
    setTimeElapsed(0);
    setGameStarted(true);
    generateSequence(roundLengths[0]);
  };

  const generateSequence = (length) => {
    const newSequence = Array.from({ length }, () => Math.floor(Math.random() * 9));
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentIndex(0);
    setTimeout(() => playSequence(newSequence), 500);
  };

  const playSequence = async (sequence) => {
    setShowingSequence(true);
    for (const index of sequence) {
      await highlightSquare(index);
      await pauseBetweenColors();
    }
    setShowingSequence(false);
  };

  const highlightSquare = (index) => {
    return new Promise((resolve) => {
      const square = document.getElementById(`square-${index}`);
      square.style.backgroundColor = colors[index];
      setTimeout(() => {
        square.style.backgroundColor = "";
        resolve();
      }, 800);
    });
  };

  const pauseBetweenColors = () => {
    return new Promise((resolve) => setTimeout(resolve, 200));
  };

  const handleSquareClick = (index) => {
    if (showingSequence || waitingForNextRound || gameOver) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (index === sequence[currentIndex]) {
      setCurrentIndex((prev) => prev + 1);

      if (newPlayerSequence.length === sequence.length) {
        if (round < roundLengths.length) {
          setWaitingForNextRound(true);
          setTimeout(() => {
            setWaitingForNextRound(false);
            setRound((prev) => prev + 1);
            generateSequence(roundLengths[round]);
          }, 3000);
        } else {
          setGameOver(true);
          sendGameProgress();
        }
      }
    } else {
      setMistakes((prev) => prev + 1);
      setPlayerSequence([]);
      setCurrentIndex(0);
      playSequence(sequence);
    }
  };

  const handleRepeatSequence = () => {
    if (!showingSequence && !waitingForNextRound) {
      playSequence(sequence);
    }
  };

  const handleRestart = () => {
    setRound(1);
    setMistakes(0);
    setGameOver(false);
    setTimeElapsed(0);
    setGameStarted(false);
    generateSequence(roundLengths[0]);
  };

  const sendGameProgress = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await fetch(`/api/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameCategory: "Atención y Memoria",
          level: 2,
          timeElapsed,
          mistakes,
        }),
      });
    } catch (error) {
      console.error("Error al enviar progreso:", error);
    }
  };

  const navigateToCertificates = () => {
    navigate("/certificados");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="flex-grow container mx-auto px-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                Prueba de Concentración
              </h1>
              <div className="bg-blue-50 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-800">¿Cómo jugar?</h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>1. Observa la secuencia de colores mostrada en el tablero.</li>
                  <li>2. Reproduce la secuencia tocando los cuadros en el orden correcto.</li>
                  <li>3. Cada ronda aumenta la longitud de la secuencia.</li>
                  <li>4. Puedes repetir la secuencia si la olvidas.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm text-green-600 font-medium">Ronda</p>
                  <p className="text-2xl font-bold text-green-700">{round}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-sm text-yellow-600 font-medium">Errores</p>
                  <p className="text-2xl font-bold text-yellow-700">{mistakes}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="text-sm text-purple-600 font-medium">Tiempo</p>
                  <p className="text-2xl font-bold text-purple-700">{timeElapsed}s</p>
                </div>
              </div>
              <button
                onClick={startGame}
                disabled={gameStarted}
                className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all ${
                  gameStarted
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {gameStarted ? "Juego en curso" : "Comenzar a jugar"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            {gameOver ? (
              <div className="text-center p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades! 🎉</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Has completado todas las secuencias correctamente
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Jugar otra vez
                  </button>
                  <button
                    onClick={navigateToCertificates}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                  >
                    Obtener Certificado
                  </button>
                  <button
                    onClick={navigateToHome}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
                  >
                    Volver al inicio
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-600">¡Certificado desbloqueado!</div>
              </div>
            ) : (
              <div>
                {waitingForNextRound && (
                  <div className="flex items-center justify-center h-32 bg-yellow-50 rounded-lg shadow-md">
                    <p className="text-xl font-bold text-yellow-800 animate-bounce">
                      ¡Prepárate para la siguiente ronda!
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      id={`square-${index}`}
                      onClick={() => handleSquareClick(index)}
                      className={`w-full h-24 bg-gray-300 rounded-lg shadow-md ${
                        showingSequence || waitingForNextRound || gameOver
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <button
                    onClick={handleRepeatSequence}
                    disabled={showingSequence || waitingForNextRound}
                    className={`px-4 py-2 rounded-lg shadow-md transition ${
                      showingSequence || waitingForNextRound
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Repetir Secuencia
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Juego de Memoria. Todos los derechos reservados.
      </footer>
    </motion.div>
  );
}

export default JuegoMemoria2;
