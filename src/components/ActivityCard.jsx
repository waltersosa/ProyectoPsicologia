import { motion } from "framer-motion";
import LockIcon from "@mui/icons-material/Lock";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ActivityCard({ activity, index, onGameComplete }) {
  const [lockedMessage, setLockedMessage] = useState(null);
  const navigate = useNavigate(); // Para redirigir a las rutas de los juegos

  const handlePlayGame = (game) => {
    if (game.locked) {
      setLockedMessage("¡Completa el primer juego para desbloquear este nivel!");
      return;
    }

    // Redirigir a la ruta del juego
    navigate(game.route); // Redirige según la ruta del juego
  };

  const handleGameComplete = (gameId) => {
    // Desbloquear el siguiente juego
    const newActivity = { ...activity };
    const gameIndex = newActivity.games.findIndex((game) => game.id === gameId);
    if (gameIndex >= 0 && gameIndex < newActivity.games.length - 1) {
      newActivity.games[gameIndex + 1].locked = false; // Desbloquear siguiente juego
    }

    // Notificar a la actividad que el juego ha sido completado
    onGameComplete(newActivity);

    // Redirigir al inicio después de completar un juego
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className={`${activity.color} p-6 text-white`}>
        <div className="text-4xl mb-2">{activity.icon}</div>
        <h3 className="text-xl font-bold">{activity.title}</h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{activity.description}</p>

        {lockedMessage && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4">
            {lockedMessage}
          </div>
        )}

        <div className="space-y-3">
          {activity.games.map((game, i) => (
            <div
              key={`${activity.id}-game-${i}`} // Clave única combinando el id de la actividad y el índice
              className={`bg-gray-50 p-4 rounded-lg ${
                game.locked ? "opacity-75" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 flex items-center">
                    {game.name}
                    {game.locked && (
                      <LockIcon className="ml-2 text-gray-500" fontSize="small" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {game.description}
                  </p>
                </div>

                {/* Botón "Jugar" */}
                <button
                  onClick={() => handlePlayGame(game)}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    game.locked
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  } text-white transition-colors`}
                  disabled={game.locked}
                >
                  <PlayArrowIcon fontSize="small" className="mr-1" />
                  Jugar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ActivityCard;
