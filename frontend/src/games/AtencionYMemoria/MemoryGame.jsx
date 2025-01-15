import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const emojis = ['😊', '😎', '🤔', '😍', '🤩', '😌', '🥳', '😇'];
const cards = [...emojis, ...emojis].map((emoji, index) => ({
  id: index,
  content: emoji,
  isFlipped: false,
  isMatched: false
}));

function MemoryGame({ activity }) {
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Nuevo estado para detectar cuando se termina el juego
  const navigate = useNavigate(); // Usamos el hook para redirigir

  useEffect(() => {
    setGameCards(shuffleCards([...cards]));
  }, []);

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (isChecking || flippedCards.length === 2 || gameCards[index].isMatched) return;

    const newCards = [...gameCards];
    newCards[index].isFlipped = true;
    setGameCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      if (gameCards[firstIndex].content === gameCards[secondIndex].content) {
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setGameCards(newCards);
        setMatches(matches + 1);
        setFlippedCards([]);
        setIsChecking(false);

        if (matches + 1 === emojis.length) {
          setGameOver(true); // Juego completado
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

  const handleBackToActivity = () => {
    navigate('/'); // Redirige al inicio
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Juego de Memoria</h1>
        <div className="flex justify-center space-x-8">
          <p className="text-xl text-gray-600">Movimientos: {moves}</p>
          <p className="text-xl text-gray-600">Parejas: {matches} de {emojis.length}</p>
        </div>
      </div>

      {/* Mostrar mensaje de victoria si el juego está completo */}
      {gameOver && (
        <div className="text-center bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-bold">¡Has ganado!</h2>
          <p>Felicidades, has encontrado todas las parejas de cartas.</p>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4"
            onClick={handleBackToActivity} // Volver al inicio
          >
            Volver a la actividad
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {gameCards.map((card, index) => (
          <ReactCardFlip
            key={card.id}
            isFlipped={card.isFlipped}
            flipDirection="horizontal"
          >
            <button
              className="w-full h-24 bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
              onClick={() => handleCardClick(index)}
            />
            <div className="w-full h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-4xl">
              {card.content}
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </motion.div>
  );
}

export default MemoryGame;
