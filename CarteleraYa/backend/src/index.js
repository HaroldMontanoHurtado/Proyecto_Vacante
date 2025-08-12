import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import pool from './db.js';  // conexión a BD

// Middleware
import { authMiddleware } from './middleware/auth.middleware.js';

// Rutas
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import peliculaRoutes from "./routes/pelicula.routes.js";
import compraRoutes from './routes/compra.routes.js';
import entradaRoutes from './routes/entrada.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/entradas', entradaRoutes);
app.use(testRoutes);

// Ruta base para verificar que API funciona
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'API CarteleraYa funcionando', time: result.rows[0].now });
    } catch (error) {
        res.status(500).json({ error: 'Error consultando la base de datos' });
    }
});

// Ruta protegida para pruebas (opcional)
app.get('/ruta-protegida', authMiddleware.verifyToken, (req, res) => {
    res.json({ message: 'Token válido' });
});

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
