const { Pool } = require('pg');
require('dotenv').config();

console.log('Conectando a la base de datos con las siguientes credenciales:');
console.log(`Usuario: ${process.env.DB_USER}`);
console.log(`Base de datos: ${process.env.DB_DATABASE}`);
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Puerto: ${process.env.DB_PORT}`);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
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