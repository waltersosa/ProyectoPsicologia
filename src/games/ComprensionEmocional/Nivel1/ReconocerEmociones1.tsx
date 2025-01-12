import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";

const estados = [
  { nombre: "Feliz", instruccion: "La felicidad es una emoción de alegría y bienestar." },
  { nombre: "Triste", instruccion: "La tristeza aparece cuando algo nos duele emocionalmente." },
  { nombre: "Enojado", instruccion: "El enojo surge cuando percibimos una injusticia o frustración." },
  { nombre: "Asustado", instruccion: "El miedo nos alerta sobre un posible peligro." },
  { nombre: "Desagrado", instruccion: "El asco ocurre cuando algo nos resulta desagradable." },
  { nombre: "Confundido", instruccion: "La confusión aparece cuando no entendemos algo completamente." },
];

function ReconocerEmociones1() {
  const [estadoReferencia, setEstadoReferencia] = useState(0);
  const [cuadrados, setCuadrados] = useState(
    Array.from({ length: 4 }, (_, index) => index % estados.length)
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [contador, setContador] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  useEffect(() => {
    let timer;
    if (juegoIniciado && !juegoTerminado) {
      timer = setInterval(() => setTiempo((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [juegoIniciado, juegoTerminado]);

  const iniciarJuego = () => setJuegoIniciado(true);

  const verificarEstados = () => {
    if (!juegoIniciado) return;
    const todosCoinciden = cuadrados.every(
      (estado) => estados[estado].nombre === estados[estadoReferencia].nombre
    );

    if (todosCoinciden) {
      setContador(contador + 1);
      if (estadoReferencia + 1 < estados.length) {
        setEstadoReferencia(estadoReferencia + 1);
        desordenarCuadrados();
      } else {
        setJuegoTerminado(true);
        setJuegoIniciado(false);
      }
    }
  };

  const desordenarCuadrados = () => {
    setCuadrados(cuadrados.map(() => Math.floor(Math.random() * estados.length)));
  };

  const cambiarEstado = (index) => {
    if (!juegoIniciado) return;

    setCuadrados((prevCuadrados) =>
      prevCuadrados.map((estado, i) =>
        i === index ? (estado + 1) % estados.length : estado
      )
    );
    verificarEstados();
  };

  const reiniciarJuego = () => {
    setEstadoReferencia(0);
    setCuadrados(Array.from({ length: 4 }, (_, index) => index % estados.length));
    setJuegoTerminado(false);
    setJuegoIniciado(false);
    setContador(0);
    setTiempo(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Contenedor principal con menos padding superior */}
      <div className="flex-grow container mx-auto px-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna de información */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                Reconocimiento de Emociones
              </h1>

              <div className="bg-blue-50 rounded-xl p-4 lg:p-5">
                <h2 className="text-base lg:text-lg font-semibold text-blue-800 mb-3">¿Cómo jugar?</h2>
                <ul className="space-y-1 text-sm lg:text-base text-gray-700">
                  <li>1. Observa la emoción de referencia</li>
                  <li>2. Haz clic en los cuadrados para cambiar las emociones</li>
                  <li>3. Haz coincidir todas las emociones con la referencia</li>
                  <li>4. ¡Completa todas las emociones lo más rápido posible!</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm text-green-600 font-medium">Caras completadas</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-700">{contador}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="text-sm text-purple-600 font-medium">Tiempo</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-700">{tiempo}s</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4">
                <h3 className="text-base font-semibold text-yellow-800 mb-2">Instrucción actual</h3>
                <p className="text-gray-700">{estados[estadoReferencia].instruccion}</p>
              </div>

              <button
                onClick={iniciarJuego}
                disabled={juegoIniciado || juegoTerminado}
                className={`w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md transition-all ${
                  juegoIniciado
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Comenzar a jugar
              </button>
            </div>
          </div>

          {/* Columna del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              {!juegoTerminado ? (
                <>
                  <div className="mb-6 text-center">
                    <h3 className="text-base font-medium text-gray-700 mb-2">Emoción de referencia</h3>
                    <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={`/src/games/ComprensionEmocional/Nivel1/Images/${estados[estadoReferencia].nombre}.jpeg`}
                        alt="Emoción de referencia"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {cuadrados.map((estado, index) => (
                      <div
                        key={index}
                        onClick={() => cambiarEstado(index)}
                        className="w-28 h-28 lg:w-36 lg:h-36 rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                      >
                        <img
                          src={`/src/games/ComprensionEmocional/Nivel1/Images/${estados[estado].nombre[0]}${index + 1}.jpeg`}
                          alt={`Cuadrado ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades! 🎉</h2>
                  <p className="text-lg text-gray-700 mb-6">Has completado todas las emociones correctamente</p>
                  <button
                    onClick={reiniciarJuego}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Jugar otra vez
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Reconocer Emociones. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default ReconocerEmociones1;
