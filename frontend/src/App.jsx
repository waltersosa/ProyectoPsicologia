import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Certificates from "./pages/Certificates";
import JuegoMemoria1 from "./games/AtencionYMemoria/Nivel1/JuegoMemoria1";
import JuegoMemoria2 from "./games/AtencionYMemoria/Nivel2/JuegoMemoria2";
import RecognizeEmotionsLevel1 from "./games/ComprensionEmocional/Nivel1/ReconocerEmociones1";
import RecognizeEmotionsLevel2 from "./games/ComprensionEmocional/Nivel2/ReconocerEmociones2";
import RecognizeEmotionsLevel3 from "./games/ComprensionEmocional/Nivel3/ReconocerEmociones3";
import BreathingExercise from "./games/RegulacionEmocional/BreathingExercise";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Perfil from "./pages/Perfil";
import Avatar from "./pages/Avatar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import authService from "./services/authService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const handleLogin = (user) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" replace />
              }
            />
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
              path="/games/AtencionYMemoria/Nivel1/JuegoMemoria1"
              element={
                <ProtectedRoute>
                  <JuegoMemoria1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/AtencionYMemoria/Nivel2/JuegoMemoria2"
              element={
                <ProtectedRoute>
                  <JuegoMemoria2 />
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
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
