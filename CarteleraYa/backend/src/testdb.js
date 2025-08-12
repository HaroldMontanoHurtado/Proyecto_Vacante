// backend/src/testdb.js
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

console.log(`[dotenv] Archivo cargado. Variables DB:`)
console.log(`  DB_NAME=${process.env.DB_NAME}`);
console.log(`  DB_USER=${process.env.DB_USER}`);
console.log(`  DB_HOST=${process.env.DB_HOST}`);
console.log(`  DB_PORT=${process.env.DB_PORT}`);

// Detectar si estamos dentro de Docker
let detectedHost;
if (process.env.DB_HOST) {
    detectedHost = process.env.DB_HOST;
} else if (process.env.HOSTNAME) {
    // Si tenemos hostname (típico en contenedores)
    detectedHost = 'db';
} else {
    detectedHost = 'localhost';
}

console.log(`Usando DB_HOST: ${detectedHost}`);

const pool = new Pool({
    host: detectedHost,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log("Conectando a la DB...");

try {
    const res = await pool.query('SELECT NOW()');
    console.log(`✅ Conexión exitosa. Hora actual en la DB: ${res.rows[0].now}`);
} catch (err) {
    console.error(`❌ Error conexión BD: ${err.message}`);
    console.error("Detalles:", err);
} finally {
    await pool.end();
}
