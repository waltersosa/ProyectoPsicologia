import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AlertCircle, Lock } from "lucide-react";

const GAME_REQUIREMENTS = {
  ComprensionEmocional: {
    Nivel1: { required: [] },
    Nivel2: { required: ["ComprensionEmocional.Nivel1"] },
    Nivel3: { required: ["ComprensionEmocional.Nivel2"] },
  },
  AtencionYMemoria: {
    Nivel1: { required: [] },
    Nivel2: { required: ["AtencionYMemoria.Nivel1"] },
  },
  RegulacionEmocional: {
    BreathingExercise: { required: ["ComprensionEmocional.Nivel1"] },
  },
};

function GameAccess({ gameCategory, gameLevel, children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch("/api/users/progress", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener progreso");
        }

        const progress = await response.json();
        console.log("Progreso del usuario:", progress);

        // Verificar requisitos
        const requirements = GAME_REQUIREMENTS[gameCategory]?.[gameLevel]?.required || [];
        console.log("Requisitos para desbloquear:", requirements);

        const hasCompletedRequirements = requirements.every((req) => {
          const [cat, lvl] = req.split(".");
          const levelRequired = parseInt(lvl.replace("Nivel", ""), 10);

          const userProgress = progress.find((p) => p.game_category === cat);
          if (!userProgress) return false;

          return userProgress.level_completed >= levelRequired;
        });

        setHasAccess(hasCompletedRequirements);
      } catch (error) {
        console.error("Error al verificar acceso:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [gameCategory, gameLevel]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        <AlertCircle className="inline mr-2" />
        {error}
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Juego Bloqueado</h2>
          <p className="text-gray-600 mb-4">
            Debes completar los niveles anteriores para acceder a este juego.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return children;
}

export default GameAccess;
