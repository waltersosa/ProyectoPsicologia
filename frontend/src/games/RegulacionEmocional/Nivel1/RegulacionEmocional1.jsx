import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../services/config";

function RegulacionEmocional1() {
  const [phase, setPhase] = useState("prepare");
  const [timer, setTimer] = useState(3);
  const [cycles, setCycles] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (!gameOver && gameStarted) {
      interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [gameOver, gameStarted]);

  useEffect(() => {
    let interval;

    if (gameStarted) {
      if (phase === "prepare" && timer > 0) {
        interval = setInterval(() => setTimer((t) => t - 1), 1000);
      } else if (phase === "prepare" && timer === 0) {
        setPhase("inhale");
        setTimer(2);
      } else if (phase === "inhale" && timer > 0) {
        interval = setInterval(() => setTimer((t) => t - 1), 1000);
      } else if (phase === "inhale" && timer === 0) {
        setPhase("hold");
        setTimer(5);
      } else if (phase === "hold" && timer > 0) {
        interval = setInterval(() => setTimer((t) => t - 1), 1000);
      } else if (phase === "hold" && timer === 0) {
        setPhase("exhale");
        setTimer(6);
      } else if (phase === "exhale" && timer > 0) {
        interval = setInterval(() => setTimer((t) => t - 1), 1000);
      } else if (phase === "exhale" && timer === 0) {
        setCycles((c) => c + 1);
        if (cycles < 2) {
          setPhase("inhale");
          setTimer(2);
        } else {
          setPhase("complete");
          setTimer(0);
          setGameOver(true);
          sendProgress();
        }
      }
    }

    return () => clearInterval(interval);
  }, [phase, timer, cycles, gameStarted]);

  const sendProgress = async () => {
    try {
      await fetch(getApiUrl("/api/progress"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gameCategory: "Regulación Emocional",
          level: 1,
          timeElapsed,
        }),
      });
    } catch (error) {
      console.error("Error al enviar progreso:", error);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const navigateToCertificates = () => {
    navigate("/certificados");
  };

  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 2, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      transition: { duration: 5, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: 6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="flex-grow container mx-auto px-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de información */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                Ejercicio de Respiración
              </h1>
              <div className="bg-green-50 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-green-800">¿Cómo jugar?</h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>1. Sigue el círculo para regular tu respiración.</li>
                  <li>2. Completa los ciclos: Inhala, Mantén y Exhala.</li>
                  <li>3. Relájate y mejora tu regulación emocional.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-sm text-blue-600 font-medium">Tiempo</p>
                  <p className="text-2xl font-bold text-blue-700">{timeElapsed}s</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm text-green-600 font-medium">Ciclos</p>
                  <p className="text-2xl font-bold text-green-700">{cycles} / 3</p>
                </div>
              </div>
              <button
                onClick={startGame}
                disabled={gameStarted}
                className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all ${
                  gameStarted
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {gameStarted ? "Juego en curso" : "Comenzar Juego"}
              </button>
            </div>
          </div>

          {/* Panel del ejercicio */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            {phase !== "complete" ? (
              <div className="flex flex-col items-center justify-center space-y-8">
                <motion.div
                  className="w-32 h-32 bg-green-500 rounded-full"
                  variants={circleVariants}
                  animate={phase}
                />
                <div className="text-2xl font-semibold text-gray-800">
                  {phase === "prepare" && `Preparándose... ${timer}`}
                  {phase === "inhale" && `Inhala... ${timer}`}
                  {phase === "hold" && `Mantén... ${timer}`}
                  {phase === "exhale" && `Exhala... ${timer}`}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  ¡Ejercicio Completado! 🎉
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Has completado los 3 ciclos de respiración
                </p>
                <button
                  onClick={navigateToCertificates}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
                >
                  Obtener Certificado
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Regulación Emocional. Todos los derechos reservados.
      </footer>
    </motion.div>
  );
}

export default RegulacionEmocional1;
