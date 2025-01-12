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

  const imagePath = (estado: string) =>
    new URL(`./images/${estado.toLowerCase()}.jpeg`, import.meta.url).href;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (juegoIniciado && !juegoTerminado) {
      timer = setInterval(() => setTiempo((prev) => prev + 1), 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [juegoIniciado, juegoTerminado]);

  const cambiarEstado = (index: number) => {
    if (!juegoIniciado) return;

    setCuadrados((prevCuadrados) =>
      prevCuadrados.map((estado, i) =>
        i === index ? (estado + 1) % estados.length : estado
      )
    );
    verificarEstados();
  };

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

  const reiniciarJuego = () => {
    setEstadoReferencia(0);
    setCuadrados(Array.from({ length: 4 }, (_, index) => index % estados.length));
    setJuegoTerminado(false);
    setJuegoIniciado(false);
    setContador(0);
    setTiempo(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative flex flex-col">
      <div className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de información */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-[500px] overflow-hidden">
            <div className="space-y-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                Reconocimiento de Emociones
              </h1>

              <div className="bg-blue-50 rounded-xl p-5 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-blue-800 mb-4">
                  ¿Cómo jugar?
                </h2>
                <ul className="space-y-2 text-sm lg:text-base text-gray-700">
                  <li>1. Observa la emoción de referencia</li>
                  <li>2. Haz clic en los cuadrados para cambiar las emociones</li>
                  <li>3. Haz coincidir todas las emociones con la referencia</li>
                  <li>4. ¡Completa todas las emociones lo más rápido posible!</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 font-medium">Caras completadas</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-700">{contador}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium">Tiempo</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-700">{tiempo}s</p>
                </div>
              </div>

              <button
                onClick={reiniciarJuego}
                disabled={juegoIniciado || juegoTerminado}
                className={`w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md transition-all ${
                  juegoIniciado || juegoTerminado
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Comenzar a jugar
              </button>
            </div>
          </div>

          {/* Columna del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col h-[600px] relative">
            <div className="bg-yellow-50 rounded-xl p-4 sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                Emoción de referencia
              </h2>
              <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={imagePath(estados[estadoReferencia].nombre)}
                  alt="Emoción de referencia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4 flex-grow overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {cuadrados.map((estado, index) => (
                  <div
                    key={index}
                    onClick={() => cambiarEstado(index)}
                    className="w-28 h-28 lg:w-36 lg:h-36 rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={imagePath(estados[estado].nombre)}
                      alt={`Cuadrado ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
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
