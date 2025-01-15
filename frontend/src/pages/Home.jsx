import { motion } from 'framer-motion';
import ActivityCard from '../components/ActivityCard';

const activities = [
  {
    id: 1,
    title: 'Atención y Memoria',
    description: 'Mejora tu concentración y memoria con juegos divertidos',
    icon: '🧠',
    color: 'bg-blue-500',
    games: [
      {
        name: 'Encuentra el Par',
        route: '/games/AtencionYMemoria/MemoryGame', // Ruta de la página de juego
        locked: false,
        description: 'Encuentra las parejas de cartas iguales',
      },
      {
        name: 'Busca las Diferencias',
        route: '/games/AtencionYMemoria/diferencias', // Ruta de la página de juego
        locked: true,
        description: 'Encuentra las diferencias entre dos imágenes',
      },
      {
        name: 'Prueba de Concentración',
        route: '/games/AtencionYMemoria/concentracion', // Ruta de la página de juego
        locked: true,
        description: 'Pon a prueba tu capacidad de concentración',
      },
    ],
  },
  {
    id: 2,
    title: 'Comprensión Emocional',
    description: 'Aprende a identificar y entender las emociones',
    icon: '🎭',
    color: 'bg-purple-500',
    games: [
      {
        name: 'Nivel 1: Reconocer Emociones 1',
        route: '/games/ComprensionEmocional/Nivel1', // Ruta del primer nivel
        locked: false,
        description: 'Completa las diferentes expresiones de emociones',
      },
      {
        name: 'Nivel 2: Reconocer Emociones 2',
        route: '/games/ComprensionEmocional/Nivel2', // Ruta del segundo nivel
        locked: false,
        description: 'Identifica las emociones usando palabras que las describen',
      },
      {
        name: 'Nivel 3: Reconocer Emociones 3',
        route: '/games/ComprensionEmocional/Nivel3', // Ruta del segundo nivel
        locked: false,
        description: 'Identifica emociones segun el escenario que se presenta',
      },
    ],
  },
  {
    id: 3,
    title: 'Regulación Emocional',
    description: 'Técnicas y ejercicios para manejar tus emociones',
    icon: '🌟',
    color: 'bg-green-500',
    games: [
      {
        name: 'Ejercicios de Respiración',
        route: '/games/RegulacionEmocional/BreathingExercise', // Ruta de la página de juego
        locked: false,
        description: 'Aprende técnicas de respiración para calmarte',
      },
      {
        name: 'Viaje de Relajación',
        route: '/games/RegulacionEmocional/BreathingExercise', // Ruta de la página de juego
        locked: true,
        description: 'Realiza un viaje guiado de relajación',
      },
      {
        name: 'Reestructuración de Pensamientos',
        route: '/games/RegulacionEmocional/BreathingExercise', // Ruta de la página de juego
        locked: true,
        description: 'Aprende a transformar pensamientos negativos',
      },
    ],
  },
];

function Home() {
  // Función para manejar cuando un juego se completa y desbloquear el siguiente
  const handleGameComplete = (activityId, gameId) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        const updatedGames = activity.games.map((game, index) => {
          if (index === gameId && index < activity.games.length - 1) {
            activity.games[index + 1].locked = false; // Desbloquea el siguiente juego
          }
          return game;
        });
        return { ...activity, games: updatedGames };
      }
      return activity;
    });

    // Actualizamos el estado de las actividades en la página, aquí deberías implementar un estado si lo necesitas.
    console.log(updatedActivities);
  };

  return (
    <div className="space-y-8 px-4 md:px-8">
      {/* Encabezado animado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Bienvenido a tu Espacio Emocional!
        </h1>
        <p className="text-xl text-gray-600">
          Explora actividades divertidas que te ayudarán a entender y manejar tus emociones
        </p>
      </motion.div>

      {/* Tarjetas de actividades */}
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
            <ActivityCard
              activity={activity}
              index={index}
              onGameComplete={(gameId) => handleGameComplete(activity.id, gameId)} // Pasamos la función para desbloquear
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Home;
