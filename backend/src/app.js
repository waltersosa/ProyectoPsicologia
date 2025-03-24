const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Configuración del servidor
const app = express();

// Middleware de CORS con múltiples orígenes
const allowedOrigins = [
  'http://localhost:5173',
  'https://farmer-removable-wi-sf.trycloudflare.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
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
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

