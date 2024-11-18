import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Certificates from './pages/Certificates';
import MemoryGame from './games/MemoryGame'; // Importa el componente de juego
import EmotionDetector from './games/EmotionDetector';
import BreathingExercise from './games/BreathingExercise';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Perfil from './pages/perfil';
import Avatar from './pages/Avatar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificados" element={<Certificates />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/juegos/memoria" element={<MemoryGame />} />
            <Route path="/juegos/emociones" element={<EmotionDetector />} />
            <Route path="/juegos/respiracion" element={<BreathingExercise />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
