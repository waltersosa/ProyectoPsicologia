import { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

function Certificates() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'Experto en Atención y Memoria',
      description: 'Por completar todos los ejercicios de atención y memoria',
      miniJuegosCompletados: 3, // Cambia según progreso
      totalMiniJuegos: 3,
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Maestro de las Emociones',
      description: 'Por completar todos los ejercicios de comprensión emocional',
      miniJuegosCompletados: 2, // Cambia según progreso
      totalMiniJuegos: 3,
      date: null,
    },
    {
      id: 3,
      title: 'Regulador Emocional Avanzado',
      description: 'Por completar todos los ejercicios de regulación emocional',
      miniJuegosCompletados: 1, // Cambia según progreso
      totalMiniJuegos: 3,
      date: null,
    },
  ]);

  const calculateProgress = (miniJuegosCompletados, totalMiniJuegos) =>
    Math.round((miniJuegosCompletados / totalMiniJuegos) * 100);

  const generateCertificate = (certificate) => {
    const doc = new jsPDF();
    const docWidth = doc.internal.pageSize.width;
    
    // Fondo de página
    doc.setFillColor(240, 240, 240); // Color de fondo suave
    doc.rect(10, 10, docWidth - 20, 290, 'F'); // Borde del fondo

    // Título del Certificado
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificado de Logro', docWidth / 2, 40, { align: 'center' });

    // Título del Logro
    doc.setFontSize(22);
    doc.setFont('helvetica', 'normal');
    doc.text(certificate.title, docWidth / 2, 80, { align: 'center' });

    // Descripción
    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text('Este certificado se otorga por haber completado exitosamente', 15, 100);
    doc.text('todos los ejercicios de la categoría:', 15, 110);

    // Descripción detallada
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(certificate.description, 15, 125, { maxWidth: docWidth - 30 });

    // Fecha
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de obtención: ${certificate.date || 'Pendiente'}`, docWidth / 2, 150, { align: 'center' });

    // Barra de progreso
    const progress = calculateProgress(
      certificate.miniJuegosCompletados,
      certificate.totalMiniJuegos
    );
    doc.setFillColor(0, 123, 255);
    doc.rect(15, 160, (docWidth - 30) * (progress / 100), 10, 'F'); // Barra de progreso

    // Texto de progreso
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Progreso: ${progress}%`, docWidth / 2, 180, { align: 'center' });

    // Firma o logo (opcional, puedes agregar un logo si es necesario)
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Firma:', 15, 220);
    doc.line(15, 225, docWidth - 15, 225); // Línea para firma

    // Descargar el PDF
    doc.save(`certificado-${certificate.id}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mis Certificados
        </h1>
        <p className="text-xl text-gray-600">
          Colección de logros obtenidos en tu viaje emocional
        </p>
      </motion.div>

      <div className="grid gap-6">
        {certificates.map((certificate) => {
          const progress = calculateProgress(
            certificate.miniJuegosCompletados,
            certificate.totalMiniJuegos
          );

          const isCompleted = progress === 100;

          return (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white rounded-lg shadow-md p-6 transition ${isCompleted ? 'border-l-4 border-green-500' : 'opacity-80'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {certificate.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{certificate.description}</p>
                  {isCompleted ? (
                    <p className="text-green-600 text-sm mt-2">
                      Obtenido el: {certificate.date}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">
                      Progreso: {progress}%
                    </p>
                  )}
                </div>
                {isCompleted && (
                  <button
                    onClick={() => generateCertificate(certificate)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <DownloadIcon className="mr-1" />
                    Descargar
                  </button>
                )}
              </div>

              {/* Barra de progreso */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Certificates;
