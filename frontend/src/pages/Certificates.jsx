import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";
import progressService from "../services/progressService";
import { getApiUrl } from "../services/config";

function Certificates() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "Experto en Atención y Memoria",
      description: "Por completar todos los ejercicios de atención y memoria",
      category: "Atención y Memoria",
      totalMiniJuegos: 2, // Dos juegos, cada uno aporta un 50%
      progress: 0,
      date: null,
    },
    {
      id: 2,
      title: "Maestro de las Emociones",
      description: "Por completar todos los ejercicios de comprensión emocional",
      category: "Comprensión Emocional",
      totalMiniJuegos: 3,
      progress: 0,
      date: null,
    },
    {
      id: 3,
      title: "Regulador Emocional Avanzado",
      description: "Por completar todos los ejercicios de regulación emocional",
      category: "Regulación Emocional",
      totalMiniJuegos: 1, // Un solo juego, aporta el 100%
      progress: 0,
      date: null,
    },
  ]);

  const [userName, setUserName] = useState("");

  // Obtener progreso y datos del usuario
  const fetchData = async () => {
    try {
      // Obtener el progreso del usuario
      const progressData = await progressService.getProgress();

      const updatedCertificates = certificates.map((cert) => {
        const categoryProgress = progressData.find(
          (item) => item.game_category === cert.category
        );

        const completedLevels = categoryProgress ? categoryProgress.level_completed : 0;
        const progress = Math.min(
          Math.round((completedLevels / cert.totalMiniJuegos) * 100),
          100
        );

        return {
          ...cert,
          progress,
          date: progress === 100 ? new Date().toISOString().split("T")[0] : cert.date,
        };
      });

      setCertificates(updatedCertificates);

      // Obtener el nombre del usuario
      const userResponse = await fetch(getApiUrl("/api/users/profile"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserName(userData.name);
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateCertificate = (certificate) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Dimensiones
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Fondo decorativo
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Borde decorativo
    doc.setDrawColor(70, 100, 200);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "S");

    // Título
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text("Certificado de Logro", pageWidth / 2, 40, { align: "center" });

    // Línea decorativa
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 4, 45, (pageWidth / 4) * 3, 45);

    // Nombre del usuario
    doc.setFontSize(24);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94);
    doc.text("Se certifica que:", pageWidth / 2, 70, { align: "center" });

    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.text(userName, pageWidth / 2, 85, { align: "center" });

    // Logro
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(
      "ha completado exitosamente todos los ejercicios de",
      pageWidth / 2,
      105,
      { align: "center" }
    );

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(certificate.category, pageWidth / 2, 120, { align: "center" });

    // Descripción
    doc.setFontSize(14);
    doc.setFont("helvetica", "italic");
    doc.text(certificate.description, pageWidth / 2, 140, {
      align: "center",
      maxWidth: 150,
    });

    // Fecha
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de obtención: ${certificate.date}`, pageWidth / 2, 160, {
      align: "center",
    });

    // Guardar el PDF
    doc.save(
      `certificado-${certificate.category.toLowerCase().replace(/\s+/g, "-")}.pdf`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Certificados</h1>
        <p className="text-xl text-gray-600">Tu progreso en los juegos</p>
      </motion.div>

      <div className="grid gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white rounded-lg shadow-md p-6 transition ${
              certificate.progress === 100 ? "border-l-4 border-green-500" : "opacity-80"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {certificate.title}
                </h2>
                <p className="text-gray-600 mt-2">{certificate.description}</p>
                {certificate.progress === 100 ? (
                  <p className="text-green-600 text-sm mt-2">
                    Certificado obtenido: {certificate.date}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">
                    Progreso: {certificate.progress}%
                  </p>
                )}
              </div>
              {certificate.progress === 100 && (
                <button
                  onClick={() => generateCertificate(certificate)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <DownloadIcon className="mr-1" />
                  Descargar
                </button>
              )}
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    certificate.progress === 100 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${certificate.progress}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;
