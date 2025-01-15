const { Pool } = require('pg');
require('dotenv').config();

// Solo para debug - NO usar en producción
console.log('Intentando conectar con:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // Temporalmente mostrar la contraseña para debug
  port: process.env.DB_PORT
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Prueba de conexión con más detalles
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error detallado de conexión:', {
      code: err.code,
      message: err.message,
      stack: err.stack
    });
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
  release();
});

module.exports = pool; 