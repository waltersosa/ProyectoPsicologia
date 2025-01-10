import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const estados = [
  { nombre: "Feliz", instruccion: "La felicidad es una emoción de alegría y bienestar." },
  { nombre: "Triste", instruccion: "La tristeza aparece cuando algo nos duele emocionalmente." },
  { nombre: "Enojado", instruccion: "El enojo surge cuando percibimos una injusticia o frustración." },
  { nombre: "Asustado", instruccion: "El miedo nos alerta sobre un posible peligro." },
  { nombre: "Desagrado", instruccion: "El asco ocurre cuando algo nos resulta desagradable." },
  { nombre: "Confundido", instruccion: "La confusión aparece cuando no entendemos algo completamente." },
];

const imagenReferencia = (estado) => `/src/games/ComprensionEmocional/Nivel1/Images/${estado}.jpeg`;
const imagenCuadrado = (estado, cuadrado) =>
  `/src/games/ComprensionEmocional/Nivel1/Images/${estado[0]}${cuadrado}.jpeg`;

const ReconocerEmociones1 = () => {
  const [estadoReferencia, setEstadoReferencia] = useState(0);
  const [cuadrados, setCuadrados] = useState(
    Array.from({ length: 4 }, (_, index) => index % estados.length)
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [contador, setContador] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (!juegoTerminado) {
      timer = setInterval(() => setTiempo((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [juegoTerminado]);

  const verificarEstados = () => {
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
      }
    }
  };

  const desordenarCuadrados = () => {
    setCuadrados(cuadrados.map(() => Math.floor(Math.random() * estados.length)));
  };

  const cambiarEstado = (index) => {
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
    setContador(0);
    setTiempo(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Reconocimiento de Emociones Básicas
      </h1>

      {/* Cronómetro debajo del título */}
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-700">Tiempo</p>
          <p className="text-2xl font-bold text-blue-500">{tiempo} s</p>
        </div>
      </div>

      {/* Instrucción del estado actual */}
      <div className="text-lg text-gray-700 mb-6 text-center">
        {juegoTerminado
          ? "¡Juego terminado! 🎉"
          : estados[estadoReferencia].instruccion}
      </div>

      {/* Estadísticas en línea */}
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div className="flex items-center text-xl font-semibold text-gray-700">
          <span>Caras completadas:</span>
          <span className="ml-2 text-green-600 font-bold">{contador}</span>
        </div>
      </div>

      {!juegoTerminado && (
        <>
          {/* Imagen de referencia */}
          <div
            className="w-40 h-40 border-4 border-gray-400 rounded-lg bg-center bg-cover mb-6"
            style={{
              backgroundImage: `url('${imagenReferencia(estados[estadoReferencia].nombre)}')`,
            }}
          ></div>

          {/* Cuadrados */}
          <div className="grid grid-cols-2 gap-6">
            {cuadrados.map((estado, index) => (
              <div
                key={index}
                className="w-40 h-40 border-4 border-gray-400 rounded-lg bg-center bg-cover cursor-pointer hover:scale-105 transform transition"
                style={{
                  backgroundImage: `url('${imagenCuadrado(
                    estados[estado].nombre,
                    index + 1
                  )}')`,
                }}
                onClick={() => cambiarEstado(index)}
              ></div>
            ))}
          </div>
        </>
      )}

      {juegoTerminado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center shadow-xl">
            <h2 className="text-3xl font-bold text-green-600 mb-4">¡Felicidades! 🎉</h2>
            <p className="text-lg text-gray-700 mb-4">
              Has completado todas las caras correctamente.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-lg">Caras completadas</p>
                <p className="text-2xl text-green-600 font-bold">{contador}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-lg">Tiempo total</p>
                <p className="text-2xl text-blue-600 font-bold">{tiempo} s</p>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                onClick={reiniciarJuego}
              >
                Jugar otra vez
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                onClick={() => navigate("/")}
              >
                Regresar al inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReconocerEmociones1;
