import React, { useState } from 'react';
import { 
  Trophy,
  Star,
  Heart,
  Smile,
  Gamepad,
  Medal,
  Brain,
  Calendar,
  ChevronRight
} from 'lucide-react';

function Perfil() {
  const [user] = useState({
    name: 'Alex García',
    age: 12,
    avatar: 'https://images.unsplash.com/photo-1595702419689-b64c73d36481?w=150&h=150&fit=crop',
    level: 8,
    emotionalPoints: 2450,
    streak: 15,
    achievements: [
      { name: 'Certificado de Calma', description: '5 días seguidos practicando respiración', icon: <Heart className="w-6 h-6" /> },
      { name: 'Certificado de Explorador Emocional', description: 'Identificó 10 emociones diferentes', icon: <Brain className="w-6 h-6" /> },
      { name: 'Certificado de Jugador Experto', description: 'Completó 20 juegos', icon: <Gamepad className="w-6 h-6" /> }
    ],
    recentEmotions: [
      { emotion: 'Feliz', date: 'Hoy', intensity: 4 },
      { emotion: 'Triste', date: 'Ayer', intensity: 3 },
      { emotion: 'Ansioso', date: 'Hace 2 días', intensity: 2 }
    ],
    gameHistory: [
      'Jardín de la Calma',
      'Detector de Emociones',
      'Aventura Emocional',
      'Encuentra el Par',
      'Busca las Diferencias'
    ]
  });

  const [note, setNote] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna izquierda: Perfil y Logros */}
          <div className="space-y-6">
            {/* Perfil Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-purple-600 font-medium">Nivel {user.level} • {user.age} años</p>
                <div className="mt-3 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">{user.emotionalPoints} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{user.streak} días</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logros Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Certificados</h2>
              <div className="space-y-3">
                {user.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{achievement.name}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna central: Emociones */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mi Diario Emocional</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe aquí cómo te sientes..."
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Columna derecha: Historial de Juegos */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Juegos</h2>
            <div className="space-y-3">
              {user.gameHistory.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Gamepad className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-700">{game}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;