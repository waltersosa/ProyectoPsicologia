const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/database');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Configuración del servidor
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto a la URL de tu frontend
  credentials: true,
}));
app.use(express.json());

// Middleware de logs (antes de las rutas)
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Ruta de prueba para verificar conexión a la base de datos
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Conexión exitosa a la base de datos',
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al conectar con la base de datos',
      details: error.message,
    });
  }
});

// Rutas
app.use('/api/users', userRoutes); // Ruta para usuarios
app.use('/api/progress', progressRoutes); // Ruta para progreso

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
