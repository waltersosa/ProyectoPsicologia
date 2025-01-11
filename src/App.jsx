import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Certificates from "./pages/Certificates";
import MemoryGame from "./games/AtencionYMemoria/MemoryGame";
import RecognizeEmotionsLevel1 from "./games/ComprensionEmocional/Nivel1/ReconocerEmociones1";
import RecognizeEmotionsLevel2 from "./games/ComprensionEmocional/Nivel2/ReconocerEmociones2";
import RecognizeEmotionsLevel3 from "./games/ComprensionEmocional/Nivel3/ReconocerEmociones3";
import BreathingExercise from "./games/RegulacionEmocional/BreathingExercise";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Perfil from "./pages/Perfil";
import Avatar from "./pages/Avatar";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        {/* Navbar siempre en la parte superior */}
        <Navbar />

        {/* Contenido principal crece dinámicamente */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Página principal */}
            <Route path="/" element={<Home />} />

            {/* Rutas generales */}
            <Route path="/certificados" element={<Certificates />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/avatar" element={<Avatar />} />

            {/* Juegos */}
            <Route path="/games/AtencionYMemoria/MemoryGame" element={<MemoryGame />} />
            <Route
              path="/games/ComprensionEmocional/Nivel1"
              element={<RecognizeEmotionsLevel1 />}
            />
            <Route
              path="/games/ComprensionEmocional/Nivel2"
              element={<RecognizeEmotionsLevel2 />}
            />
              <Route
              path="/games/ComprensionEmocional/Nivel3"
              element={<RecognizeEmotionsLevel3 />}
            />
            <Route
              path="/games/RegulacionEmocional/BreathingExercise"
              element={<BreathingExercise />}
            />
          </Routes>
        </main>

        {/* Footer siempre al final */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;