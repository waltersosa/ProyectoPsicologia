import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../services/config";

const emojis = ["😊", "😎", "🤔", "😍", "🤩", "😌", "🥳", "😇"];
const cards = [...emojis, ...emojis].map((emoji, index) => ({
  id: index,
  content: emoji,
  isFlipped: false,
  isMatched: false,
}));

function JuegoMemoria1() {
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const navigate = useNavigate();

  // Inicializa las cartas al iniciar el juego
  useEffect(() => {
    setGameCards(shuffleCards([...cards]));
  }, []);

  // Controla el temporizador del juego
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (!gameStarted || isChecking || flippedCards.length === 2 || gameCards[index].isMatched) {
      return;
    }

    const newCards = [...gameCards];
    newCards[index].isFlipped = true;
    setGameCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      if (gameCards[firstIndex].content === gameCards[secondIndex].content) {
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setGameCards(newCards);
        setMatches((prev) => prev + 1);
        setFlippedCards([]);
        setIsChecking(false);

        if (matches + 1 === emojis.length) {
          setGameOver(true);
          setGameStarted(false);
          sendGameProgress();
        }
      } else {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setGameCards(newCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setGameCards(shuffleCards([...cards]));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setGameStarted(false);
    setTimeElapsed(0);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const navigateToNextLevel = () => {
    navigate("/games/AtencionYMemoria/Nivel2/JuegoMemoria2");
  };

  const sendGameProgress = async () => {
    try {
      const response = await fetch(getApiUrl("/api/progress"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gameCategory: "Atención y Memoria",
          level: 1,
          timeElapsed,
          moves,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el progreso");
      }

      console.log("Progreso enviado con éxito");
    } catch (error) {
      console.error("Error al enviar progreso:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="flex-grow container mx-auto px-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de información */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                Encuentra el par
              </h1>
              <div className="bg-blue-50 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-800">¿Cómo jugar?</h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>1. Haz clic en las tarjetas para voltearlas.</li>
                  <li>2. Encuentra las parejas iguales.</li>
                  <li>3. Completa el juego con el menor número de movimientos.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm text-green-600 font-medium">Movimientos</p>
                  <p className="text-2xl font-bold text-green-700">{moves}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="text-sm text-purple-600 font-medium">Tiempo transcurrido</p>
                  <p className="text-2xl font-bold text-purple-700">{timeElapsed}s</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-sm text-yellow-600 font-medium">Caras completadas</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {matches} / {emojis.length}
                  </p>
                </div>
              </div>
              <button
                onClick={handleStartGame}
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              >
                Comenzar a jugar
              </button>
            </div>
          </div>

          {/* Panel del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            {!gameOver ? (
              <div className="grid grid-cols-4 gap-4">
                {gameCards.map((card, index) => (
                  <ReactCardFlip
                    key={card.id}
                    isFlipped={card.isFlipped || !gameStarted}
                    flipDirection="horizontal"
                  >
                    <button
                      className="w-full h-24 bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600"
                      onClick={() => handleCardClick(index)}
                    />
                    <div className="w-full h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-4xl">
                      {card.content}
                    </div>
                  </ReactCardFlip>
                ))}
              </div>
            ) : (
              <div className="text-center p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades! 🎉</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Has completado todas las emociones correctamente
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Jugar otra vez
                  </button>
                  <button
                    onClick={navigateToNextLevel}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                  >
                    Pasar al siguiente nivel
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

export default JuegoMemoria1;
