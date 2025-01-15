import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';
import { getApiUrl } from '../services/config';

function Certificates() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'Experto en Atención y Memoria',
      description: 'Por completar todos los ejercicios de atención y memoria',
      category: 'Atención y Memoria',
      totalMiniJuegos: 3,
      date: null,
    },
    {
      id: 2,
      title: 'Maestro de las Emociones',
      description: 'Por completar todos los ejercicios de comprensión emocional',
      category: 'Comprensión Emocional',
      totalMiniJuegos: 3,
      date: null,
    },
    {
      id: 3,
      title: 'Regulador Emocional Avanzado',
      description: 'Por completar todos los ejercicios de regulación emocional',
      category: 'Regulación Emocional',
      totalMiniJuegos: 3,
      date: null,
    },
  ]);
  const [userName, setUserName] = useState('');

  const fetchProgress = async () => {
    try {
      const response = await fetch(getApiUrl('/api/progress'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const userProgress = await response.json();
        
        const updatedCertificates = certificates.map(cert => {
          const categoryProgress = userProgress.find(p => p.game_category === cert.category);
          const completedLevels = categoryProgress ? categoryProgress.level_completed + 1 : 0;
          const progress = Math.round((completedLevels / cert.totalMiniJuegos) * 100);
          
          return {
            ...cert,
            miniJuegosCompletados: completedLevels,
            date: progress === 100 ? new Date().toISOString().split('T')[0] : null
          };
        });
        
        setCertificates(updatedCertificates);
      }
    } catch (error) {
      console.error('Error al obtener progreso:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No hay token disponible');
          return;
        }

        const response = await fetch(getApiUrl('/api/users/profile'), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al obtener datos del usuario');
        }
        
        const userData = await response.json();
        console.log('Datos de usuario recibidos:', userData); // Log para debug
        setUserName(userData.name);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        // Aquí podrías mostrar un mensaje al usuario o manejar el error de otra forma
      }
    };

    const fetchData = async () => {
      await fetchUserData();
      await fetchProgress();
    };

    fetchData();
  }, []);

  const calculateProgress = (miniJuegosCompletados, totalMiniJuegos) =>
    Math.round((miniJuegosCompletados / totalMiniJuegos) * 100);

  const generateCertificate = (certificate) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Dimensiones del documento
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Agregar fondo decorativo
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Agregar borde decorativo
    doc.setDrawColor(70, 100, 200);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

    // Agregar diseño decorativo en las esquinas
    const cornerSize = 20;
    doc.setLineWidth(1);
    // Esquina superior izquierda
    doc.line(10, 20, 30, 20);
    doc.line(20, 10, 20, 30);
    // Esquina superior derecha
    doc.line(pageWidth - 30, 20, pageWidth - 10, 20);
    doc.line(pageWidth - 20, 10, pageWidth - 20, 30);
    // Esquina inferior izquierda
    doc.line(10, pageHeight - 20, 30, pageHeight - 20);
    doc.line(20, pageHeight - 30, 20, pageHeight - 10);
    // Esquina inferior derecha
    doc.line(pageWidth - 30, pageHeight - 20, pageWidth - 10, pageHeight - 20);
    doc.line(pageWidth - 20, pageHeight - 30, pageWidth - 20, pageHeight - 10);

    // Encabezado
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Certificado de Logro', pageWidth / 2, 40, { align: 'center' });

    // Línea decorativa bajo el título
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 4, 45, (pageWidth / 4) * 3, 45);

    // Nombre del usuario
    doc.setFontSize(24);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(52, 73, 94);
    doc.text('Se certifica que:', pageWidth / 2, 70, { align: 'center' });
    
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text(userName, pageWidth / 2, 85, { align: 'center' });

    // Texto del logro
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('ha completado exitosamente todos los ejercicios de', pageWidth / 2, 105, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.category, pageWidth / 2, 120, { align: 'center' });

    // Descripción del certificado
    doc.setFontSize(14);
    doc.setFont('helvetica', 'italic');
    doc.text(certificate.description, pageWidth / 2, 140, { align: 'center', maxWidth: 150 });

    // Fecha
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de obtención: ${certificate.date}`, pageWidth / 2, 160, { align: 'center' });

    // Firmas
    doc.setLineWidth(0.5);
    // Firma 1
    doc.line(50, pageHeight - 40, 120, pageHeight - 40);
    doc.setFontSize(12);
    doc.text('Director Académico', 85, pageHeight - 35, { align: 'center' });
    
    // Firma 2
    doc.line(pageWidth - 120, pageHeight - 40, pageWidth - 50, pageHeight - 40);
    doc.text('Coordinador del Programa', pageWidth - 85, pageHeight - 35, { align: 'center' });

    // Sello (círculo decorativo)
    doc.setDrawColor(70, 100, 200);
    doc.circle(pageWidth / 2, pageHeight - 50, 20, 'S');
    doc.setFontSize(8);
    doc.text('SELLO', pageWidth / 2, pageHeight - 48, { align: 'center' });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Este certificado es válido como reconocimiento de logro en la plataforma.', pageWidth / 2, pageHeight - 15, { align: 'center' });

    // Guardar el PDF
    doc.save(`certificado-${certificate.category.toLowerCase().replace(/\s+/g, '-')}.pdf`);
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
