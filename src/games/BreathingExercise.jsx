import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir

function BreathingExercise() {
  const [phase, setPhase] = useState('prepare');
  const [timer, setTimer] = useState(3);
  const [cycles, setCycles] = useState(0);
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al inicio

  useEffect(() => {
    let interval;

    if (phase === 'prepare' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (phase === 'prepare' && timer === 0) {
      setPhase('inhale');
      setTimer(4);
    } else if (phase === 'inhale' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (phase === 'inhale' && timer === 0) {
      setPhase('hold');
      setTimer(7);
    } else if (phase === 'hold' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (phase === 'hold' && timer === 0) {
      setPhase('exhale');
      setTimer(8);
    } else if (phase === 'exhale' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (phase === 'exhale' && timer === 0) {
      setCycles(c => c + 1);
      if (cycles < 2) { // Aseguramos que solo se hagan 3 ciclos
        setPhase('inhale');
        setTimer(4);
      } else {
        setPhase('complete');
        setTimer(0); // El juego termina aquí
      }
    }

    return () => clearInterval(interval);
  }, [phase, timer, cycles]);

  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      transition: { duration: 7, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: 8, ease: "easeInOut" },
    },
  };

  const handleBackToActivity = () => {
    // Redirige al inicio (página principal)
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Ejercicio de Respiración
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Sigue el círculo para regular tu respiración
      </p>

      <div className="flex flex-col items-center justify-center space-y-8">
        {phase !== 'complete' ? (
          <>
            <motion.div
              className="w-32 h-32 bg-indigo-500 rounded-full"
              variants={circleVariants}
              animate={phase}
            />
            <div className="text-2xl font-semibold text-gray-800">
              {phase === 'prepare' && `Preparándose... ${timer}`}
              {phase === 'inhale' && `Inhala... ${timer}`}
              {phase === 'hold' && `Mantén... ${timer}`}
              {phase === 'exhale' && `Exhala... ${timer}`}
            </div>
            <div className="text-lg text-gray-600">
              Ciclo {cycles + 1} de 3
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              ¡Ejercicio Completado!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Has completado los 3 ciclos de respiración
            </p>
            <button
              onClick={handleBackToActivity}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Volver a la actividad
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BreathingExercise;
