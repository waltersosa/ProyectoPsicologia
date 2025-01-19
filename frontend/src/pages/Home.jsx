import { motion } from "framer-motion";
import ActivityCard from "../components/ActivityCard";
import { useState, useEffect } from "react";
import { getApiUrl } from "../services/config";

const initialActivities = [
  {
    id: 1,
    title: "Atención y Memoria",
    description: "Mejora tu concentración y memoria con juegos divertidos",
    icon: "🧠",
    color: "bg-blue-500",
    games: [
      {
        name: "Encuentra el Par",
        route: "/games/AtencionYMemoria/Nivel1/JuegoMemoria1",
        locked: false,
        description: "Encuentra las parejas de cartas iguales",
      },
      {
        name: "Prueba de Concentración",
        route: "/games/AtencionYMemoria/Nivel2/JuegoMemoria2",
        locked: true,
        description: "Pon a prueba tu capacidad de concentración",
      },
    ],
  },
  {
    id: 2,
    title: "Comprensión Emocional",
    description: "Aprende a identificar y entender las emociones",
    icon: "🎭",
    color: "bg-purple-500",
    games: [
      {
        name: "Nivel 1: Reconocer Emociones 1",
        route: "/games/ComprensionEmocional/Nivel1",
        locked: false,
        description: "Completa las diferentes expresiones de emociones",
      },
      {
        name: "Nivel 2: Reconocer Emociones 2",
        route: "/games/ComprensionEmocional/Nivel2",
        locked: true,
        description: "Identifica las emociones usando palabras que las describen",
      },
      {
        name: "Nivel 3: Reconocer Emociones 3",
        route: "/games/ComprensionEmocional/Nivel3",
        locked: true,
        description: "Identifica emociones según el escenario que se presenta",
      },
    ],
  },
  {
    id: 3,
    title: "Regulación Emocional",
    description: "Técnicas y ejercicios para manejar tus emociones",
    icon: "🌟",
    color: "bg-green-500",
    games: [
      {
        name: "Ejercicios de Respiración",
        route: "games/RegulacionEmocional/Nivel1",
        locked: false,
        description: "Aprende técnicas de respiración para calmarte",
      },
    ],
  },
];

function Home() {
  const [activities, setActivities] = useState(initialActivities);

  const fetchProgress = async () => {
    try {
      const response = await fetch(getApiUrl("/api/progress"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const progress = await response.json();
        console.log("Progreso recibido:", progress);

        const updatedActivities = initialActivities.map((activity) => {
          const categoryProgress = progress.find(
            (p) => p.game_category === activity.title
          );
          const levelCompleted = categoryProgress
            ? categoryProgress.level_completed
            : 0;

          console.log(
            `Progreso de ${activity.title}: Nivel completado ${levelCompleted}`
          );

          return {
            ...activity,
            games: activity.games.map((game, index) => ({
              ...game,
              locked: index > levelCompleted,
            })),
          };
        });

        setActivities(updatedActivities);
      } else {
        console.error("Error al obtener progreso: Response no ok");
      }
    } catch (error) {
      console.error("Error al obtener progreso:", error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="space-y-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Bienvenido a tu Espacio Emocional!
        </h1>
        <p className="text-xl text-gray-600">
          Explora actividades divertidas que te ayudarán a entender y manejar
          tus emociones
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ActivityCard activity={activity} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Home;
