import React, { useState } from 'react';
import './styles.css';

const EmotionGame: React.FC = () => {
  const estados = [
    { nombre: "Feliz", instruccion: "La felicidad es una emoción de alegría y bienestar." },
    { nombre: "Triste", instruccion: "La tristeza aparece cuando algo nos duele emocionalmente." },
    { nombre: "Enojado", instruccion: "El enojo surge cuando percibimos una injusticia o frustración." },
    { nombre: "Asustado", instruccion: "El miedo nos alerta sobre un posible peligro." },
    { nombre: "Desagrado", instruccion: "El asco ocurre cuando algo nos resulta desagradable." },
    { nombre: "Confundido", instruccion: "La confusión aparece cuando no entendemos algo completamente." }
  ];

  const [estadoReferencia, setEstadoReferencia] = useState(0);
  const [cuadrados, setCuadrados] = useState<number[]>([0, 1, 2, 3]);
  const [mensajeFinal, setMensajeFinal] = useState<string>('');

  const imagenReferencia = (estado: string) => `images/${estado}.jpeg`;

  const imagenCuadrado = (estado: string, cuadrado: number) => `images/${estado[0]}${cuadrado}.jpeg`;

  const cambiarEstadoCuadrado = (index: number) => {
    const nuevosCuadrados = [...cuadrados];
    nuevosCuadrados[index] = (nuevosCuadrados[index] + 1) % estados.length;
    setCuadrados(nuevosCuadrados);
    verificarEstados(nuevosCuadrados);
  };

  const verificarEstados = (nuevosCuadrados: number[]) => {
    const todosCoinciden = nuevosCuadrados.every(
      (estado) => estados[estado].nombre === estados[estadoReferencia].nombre
    );

    if (todosCoinciden) {
      if (estadoReferencia < estados.length - 1) {
        setEstadoReferencia(estadoReferencia + 1);
        desordenarCuadrados();
      } else {
        setMensajeFinal("¡Juego terminado! 🎉");
      }
    }
  };

  const desordenarCuadrados = () => {
    const nuevosCuadrados = cuadrados.map(() => Math.floor(Math.random() * estados.length));
    setCuadrados(nuevosCuadrados);
  };

  return (
    <div className="emotion-game">
      <h1>Reconocimiento de emociones básicas</h1>
      <div className="instrucciones">{estados[estadoReferencia].instruccion}</div>
      <div
        className="referencia"
        style={{ backgroundImage: `url(${imagenReferencia(estados[estadoReferencia].nombre)})` }}
      ></div>
      <div className="cuadrados-container">
        {cuadrados.map((estado, index) => (
          <div
            key={index}
            className="cuadrado"
            style={{ backgroundImage: `url(${imagenCuadrado(estados[estado].nombre, index + 1)})` }}
            onClick={() => cambiarEstadoCuadrado(index)}
          ></div>
        ))}
      </div>
      {mensajeFinal && <div className="mensaje-final">{mensajeFinal}</div>}
    </div>
  );
};

export default EmotionGame;
