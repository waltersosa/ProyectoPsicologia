import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReconocerEmociones2: React.FC = () => {
  const descriptions = {
    Nostalgia: "La melancolía que experimentamos al recordar el pasado.",
    Orgullo: "La satisfacción personal por los logros propios.",
    Compasión: "El sentimiento de empatía y preocupación por el sufrimiento de los demás.",
    Euforia: "La sensación de éxtasis y exaltación.",
    Culpa: "La carga emocional que surge cuando sentimos que hemos transgredido valores.",
    Envidia: "La mezcla de admiración y deseo por lo que otros tienen."
  };

  const imagePath = (emotion: string) => `/src/games/ComprensionEmocional/Nivel2/images/${emotion.toLowerCase()}.jpg`;

  const [time, setTime] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [remainingWords, setRemainingWords] = useState<string[]>(Object.keys(descriptions));
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!gameCompleted) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameCompleted]);

  useEffect(() => {
    const words = document.querySelectorAll(".word");
    const dropzones = document.querySelectorAll(".dropzone");

    words.forEach(word => {
      word.addEventListener("dragstart", (event: DragEvent) => {
        event.dataTransfer?.setData("text", (event.target as HTMLElement).dataset.word || "");
      });
    });

    dropzones.forEach(dropzone => {
      dropzone.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        const word = event.dataTransfer?.getData("text") || "";
        const emotion = (event.target as HTMLElement).parentElement?.dataset.emotion || "";

        if (word === emotion) {
          (event.target as HTMLElement).innerHTML = `<span class='word correct'>${word}</span>`;
          const descriptionElement = (event.target as HTMLElement).parentElement?.querySelector(".description");
          if (descriptionElement) {
            descriptionElement.textContent = descriptions[emotion as keyof typeof descriptions];
          }

          setRemainingWords(prevWords => prevWords.filter(w => w !== word));
          checkWin();
        } else {
          const dropzoneElement = event.target as HTMLElement;
          dropzoneElement.innerHTML = `<span class='word incorrect'>${word}</span>`;
          setTimeout(() => {
            dropzoneElement.innerHTML = "Arrastra aquí";
          }, 1000);
        }
      });
    });
  }, [remainingWords]);

  const checkWin = () => {
    const totalDropzones = Object.keys(descriptions).length;
    const completedDropzones = document.querySelectorAll(".dropzone .word.correct").length;

    if (completedDropzones === totalDropzones) {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setTime(0);
    setGameCompleted(false);
    setRemainingWords(Object.keys(descriptions));
    document.querySelectorAll(".dropzone").forEach(dropzone => {
      dropzone.innerHTML = "Arrastra aquí";
    });
    document.querySelectorAll(".description").forEach(desc => {
      desc.textContent = "";
    });
  };

  return (
    <div className="p-4">
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }

          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }

          .box {
            border: 2px solid #ccc;
            padding: 8px;
            width: 200px;
            text-align: center;
          }

          .box img {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border-radius: 10px;
          }

          .dropzone {
            border: 2px dashed #aaa;
            height: 40px;
            margin-top: 8px;
            background-color: #f9f9f9;
            color: #999;
          }

          .word {
            border: 1px solid #333;
            background-color: #ddd;
            color: black;
            padding: 4px;
            margin: 4px;
            display: inline-block;
            cursor: grab;
            font-size: 14px;
          }

          .word.correct {
            background-color: #8bc34a;
            cursor: not-allowed;
          }

          .word.incorrect {
            background-color: #e57373;
            color: white;
            animation: shake 0.5s;
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* Título del Juego */}
      <h1 className="text-xl font-bold text-center text-gray-700 mb-4">
        Reconocimiento de Emociones
      </h1>

      {/* Cronómetro Debajo del Título */}
      <div className="flex justify-center items-center gap-10 mb-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-700">Tiempo</p>
          <p className="text-2xl font-bold text-blue-500">{time} s</p>
        </div>
      </div>

      {/* Instrucciones */}
      <p className="text-center text-gray-600 mb-4">
        Arrastra las palabras hacia el cuadro correspondiente.
      </p>

      {/* Contenedor de las Imágenes y Dropzones */}
      <div className="container">
        {Object.keys(descriptions).map((emotion, index) => (
          <div key={index} className="box" data-emotion={emotion}>
            <img src={imagePath(emotion)} alt={emotion} />
            <div className="dropzone">Arrastra aquí</div>
            <p className="description text-gray-600 text-sm mt-2"></p>
          </div>
        ))}
      </div>

      {/* Contenedor de las Palabras */}
      <div className="mt-6 text-center">
        <h2 className="text-md font-semibold text-gray-700 mb-4">Palabras</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {remainingWords.map((word, index) => (
            <span key={index} className="word" draggable data-word={word}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Modal de Juego Completado */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-700">¡Felicidades!</h2>
            <p className="text-lg text-gray-800 mt-4">Has completado el juego en {time} segundos.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                onClick={restartGame}
              >
                Jugar Otra Vez
              </button>
              <button
                className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600"
                onClick={() => navigate("/")}
              >
                Regresar al Inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReconocerEmociones2;
