import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
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
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        {/* Navbar solo se muestra si estamos autenticados */}
        {isAuthenticated && <Navbar />}

        {/* Contenido principal */}
        <main className="flex-grow">
          <Routes>
            {/* Redirigir la ruta raíz al login si no está autenticado */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Ruta de login */}
            <Route
              path="/login"
              element={
                <Login onLogin={() => setIsAuthenticated(true)} />
              }
            />

            {/* Rutas protegidas */}
            <Route
              path="/certificados"
              element={
                <ProtectedRoute>
                  <Certificates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/avatar"
              element={
                <ProtectedRoute>
                  <Avatar />
                </ProtectedRoute>
              }
            />

            {/* Juegos protegidos */}
            <Route
              path="/games/AtencionYMemoria/MemoryGame"
              element={
                <ProtectedRoute>
                  <MemoryGame />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/ComprensionEmocional/Nivel1"
              element={
                <ProtectedRoute>
                  <RecognizeEmotionsLevel1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/ComprensionEmocional/Nivel2"
              element={
                <ProtectedRoute>
                  <RecognizeEmotionsLevel2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/ComprensionEmocional/Nivel3"
              element={
                <ProtectedRoute>
                  <RecognizeEmotionsLevel3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/RegulacionEmocional/BreathingExercise"
              element={
                <ProtectedRoute>
                  <BreathingExercise />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer solo se muestra si estamos autenticados */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;