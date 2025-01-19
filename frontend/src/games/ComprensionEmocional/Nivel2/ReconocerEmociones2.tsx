import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../services/config";

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
  const [results, setResults] = useState<{ word: string; correct: boolean }[]>([]);
  const navigate = useNavigate();

  const emotions = Object.keys(descriptions);

  const imagePath = (emotion: string) =>
    `/src/games/ComprensionEmocional/Nivel2/images/${emotion.toLowerCase()}.jpg`;

  // Control del cronómetro
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameCompleted]);

  // Inicialización del juego y lógica de arrastrar/soltar
  useEffect(() => {
    if (gameStarted) {
      setRemainingWords(emotions);
      setupDragAndDrop();
    }
    return () => {
      cleanupDragAndDrop();
    };
  }, [gameStarted]);

  const setupDragAndDrop = () => {
    const words = document.querySelectorAll(".word");
    const dropzones = document.querySelectorAll(".dropzone");

    words.forEach((word) => {
      word.addEventListener("dragstart", handleDragStart);
    });

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("drop", handleDrop);
    });
  };

  const cleanupDragAndDrop = () => {
    const words = document.querySelectorAll(".word");
    const dropzones = document.querySelectorAll(".dropzone");

    words.forEach((word) => {
      word.removeEventListener("dragstart", handleDragStart);
    });

    dropzones.forEach((dropzone) => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("drop", handleDrop);
    });
  };

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer?.setData(
      "text",
      (event.target as HTMLElement).dataset.word || ""
    );
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
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

      setResults((prevResults) => [
        ...prevResults,
        { word: droppedWord, correct: true },
      ]);

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

      setResults((prevResults) => [
        ...prevResults,
        { word: droppedWord, correct: false },
      ]);

      setTimeout(() => {
        dropzoneElement.innerHTML = "Arrastra aquí";
        dropzoneElement.classList.remove("bg-red-100", "border-red-500");
      }, 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTime(0);
    setGameCompleted(false);
    setResults([]);
  };

  const restartGame = () => {
    setTime(0);
    setGameCompleted(false);
    setGameStarted(false);
    setRemainingWords([]);
    setResults([]);
  };

  const irSiguienteNivel = () => {
    navigate("/games/ComprensionEmocional/Nivel3");
  };

  useEffect(() => {
    if (gameCompleted) {
      const updateProgress = async () => {
        try {
          const response = await fetch(getApiUrl("/api/progress"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              gameCategory: "Comprensión Emocional",
              level: 2,
              timeTaken: time,
              results,
            }),
          });

          if (!response.ok) {
            throw new Error("Error al actualizar progreso");
          }

          console.log("Progreso enviado nivel 2:", {
            gameCategory: "Comprensión Emocional",
            level: 2,
            timeTaken: time,
            results,
          });
        } catch (error) {
          console.error("Error al actualizar progreso:", error);
        }
      };

      updateProgress();
    }
  }, [gameCompleted, time, results]);

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
  
          {/* Panel del juego */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col h-[600px] relative">
            {gameCompleted ? (
              <div className="flex flex-col justify-center items-center h-full">
                <h2 className="text-4xl font-bold mb-4">¡Felicidades! 🎉</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Has completado el juego en <strong>{time} segundos</strong>.
                </p>
                <ul className="list-disc text-left text-gray-700 pl-6">
                  {emotions.map((emotion, index) => (
                    <li key={index} className="text-green-600">
                      Correcto: {emotion}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={restartGame}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    Jugar otra vez
                  </button>
                  <button
                    onClick={irSiguienteNivel}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Ir al siguiente nivel
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                  >
                    Regresar al inicio
                  </button>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
  
      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm">
        © 2025 Reconocer Emociones. Todos los derechos reservados.
      </footer>
    </div>
  );
  
};
export default ReconocerEmociones2;
