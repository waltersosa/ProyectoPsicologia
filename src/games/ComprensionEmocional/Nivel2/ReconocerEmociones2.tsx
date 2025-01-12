import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const descriptions = {
  Nostalgia: "La melancolía que experimentamos al recordar el pasado.",
  Orgullo: "La satisfacción personal por los logros propios.",
  Compasión: "El sentimiento de empatía y preocupación por el sufrimiento de los demás.",
  Euforia: "La sensación de éxtasis y exaltación.",
  Culpa: "La carga emocional que surge cuando sentimos que hemos transgredido valores.",
  Envidia: "La mezcla de admiración y deseo por lo que otros tienen.",
};

function ReconocerEmociones2() {
  const [time, setTime] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const navigate = useNavigate(); // Hook para redirigir al inicio

  const emotions = Object.keys(descriptions);

  const imagePath = (emotion: string) =>
    `/src/games/ComprensionEmocional/Nivel2/images/${emotion.toLowerCase()}.jpg`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (gameStarted) {
      setRemainingWords(emotions);
      setupDragAndDrop();
    }
  }, [gameStarted]);

  const setupDragAndDrop = () => {
    const words = document.querySelectorAll(".word");
    const dropzones = document.querySelectorAll(".dropzone");

    words.forEach((word) => {
      word.addEventListener("dragstart", (event: DragEvent) => {
        event.dataTransfer?.setData(
          "text",
          (event.target as HTMLElement).dataset.word || ""
        );
      });
    });

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();

        const droppedWord = event.dataTransfer?.getData("text") || "";
        const dropzoneElement = event.currentTarget as HTMLElement;
        const containerElement = dropzoneElement.closest("[data-emotion]") as HTMLElement;
        const targetEmotion = containerElement?.dataset.emotion || "";

        if (droppedWord === targetEmotion) {
          dropzoneElement.innerHTML = `<span class='word correct'>${droppedWord}</span>`;
          const descriptionElement =
            containerElement.querySelector(".description");
          if (descriptionElement) {
            descriptionElement.textContent =
              descriptions[targetEmotion as keyof typeof descriptions];
          }

          setRemainingWords((prevWords) => {
            const updatedWords = prevWords.filter((w) => w !== droppedWord);
            if (updatedWords.length === 0) {
              setGameCompleted(true);
              setGameStarted(false);
            }
            return updatedWords;
          });
        } else {
          dropzoneElement.innerHTML = `<span class="text-red-500 font-bold">Palabra incorrecta</span>`;
          dropzoneElement.classList.add("bg-red-100", "border-red-500");

          setTimeout(() => {
            dropzoneElement.innerHTML = "Arrastra aquí";
            dropzoneElement.classList.remove("bg-red-100", "border-red-500");
          }, 2000);
        }
      });
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setTime(0);
    setGameCompleted(false);
  };

  const restartGame = () => {
    setTime(0);
    setGameCompleted(false);
    setGameStarted(false);
    setRemainingWords([]);
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
                  <li>1. Observa las imágenes de las emociones.</li>
                  <li>2. Arrastra las palabras hacia la imagen correspondiente.</li>
                  <li>3. Si la palabra coincide, verás su descripción.</li>
                  <li>4. ¡Completa todas las emociones lo más rápido posible!</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 font-medium">
                    Emociones restantes
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-700">
                    {remainingWords.length}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium">Tiempo</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-700">
                    {time}s
                  </p>
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={gameStarted}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all ${
                  gameStarted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {gameStarted ? "Juego en progreso" : "Comenzar a jugar"}
              </button>
            </div>
          </div>

          {/* Columna del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col h-[600px] relative">
            <div className="bg-yellow-50 rounded-xl p-4 sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                Palabras disponibles
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {emotions.map((word, index) => (
                  <span
                    key={index}
                    className="word px-4 py-2 bg-gradient-to-br from-yellow-200 to-yellow-100 border-2 border-yellow-400 text-gray-800 font-semibold rounded-xl shadow-md cursor-grab hover:shadow-lg transition-all active:cursor-grabbing"
                    draggable={gameStarted}
                    data-word={word}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex-grow overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {emotions.map((emotion, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-3 bg-white p-4 rounded-lg shadow-md"
                    data-emotion={emotion}
                  >
                    <div className="w-full h-40 overflow-hidden rounded-lg">
                      <img
                        src={imagePath(emotion)}
                        alt={emotion}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="dropzone w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-center bg-gray-50 transition-colors hover:bg-gray-100"
                    >
                      Arrastra aquí
                    </div>
                    <p className="description text-sm text-gray-600 text-center h-12"></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-4xl font-bold mb-4">¡Felicidades! 🎉</h2>
            <p className="mb-6">
              Has completado el juego en <strong>{time} segundos</strong>.
            </p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Jugar otra vez
            </button>
            <button
              onClick={() => navigate("/")} // Navegar al inicio
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow ml-4 hover:bg-gray-600 transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Reconocer Emociones. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default ReconocerEmociones2;
