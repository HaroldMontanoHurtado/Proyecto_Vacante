import pool from '../db.js';

export const getPeliculas = async (req, res) => {
    try {
        const { page = 1, limit = 10, titulo, genero } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const offset = (pageNumber - 1) * limitNumber;

        let filtros = [];
        let valores = [];

        if (titulo) {
            filtros.push(`titulo ILIKE $${filtros.length + 1}`);
            valores.push(`%${titulo}%`);
        }
        if (genero) {
            filtros.push(`genero ILIKE $${filtros.length + 1}`);
            valores.push(`%${genero}%`);
        }

        const whereClause = filtros.length > 0 ? `WHERE ${filtros.join(' AND ')}` : '';

        const totalQuery = await pool.query(`SELECT COUNT(*) FROM pelicula ${whereClause}`, valores);
        const total = parseInt(totalQuery.rows[0].count);

        const peliculasQuery = await pool.query(
            `SELECT * FROM pelicula ${whereClause} ORDER BY id ASC LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`,
            [...valores, limitNumber, offset]
        );

        res.json({
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(total / limitNumber),
            peliculas: peliculasQuery.rows,
        });
    } catch (error) {
        console.error('Error al obtener peliculas:', error);
        res.status(500).json({ message: 'Error al obtener peliculas' });
    }
};

export const getPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM pelicula WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener película' });
    }
};

export const createPelicula = async (req, res) => {
    try {
        const { titulo, descripcion, duracion_min, clasificacion, genero, imagen_url, estado } = req.body;

        if (!titulo || !duracion_min) {
            return res.status(400).json({ message: "Faltan campos obligatorios: titulo o duracion_min" });
        }

        const result = await pool.query(
            `INSERT INTO pelicula (titulo, descripcion, duracion_min, clasificacion, genero, imagen_url, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [titulo, descripcion, duracion_min, clasificacion, genero, imagen_url, estado || 'activo']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear película' });
    }
};

export const updatePelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, duracion_min, clasificacion, genero, imagen_url, estado } = req.body;

        const result = await pool.query(
            `UPDATE pelicula
            SET titulo=$1, descripcion=$2, duracion_min=$3, clasificacion=$4, genero=$5, imagen_url=$6, estado=$7
            WHERE id=$8 RETURNING *`,
            [titulo, descripcion, duracion_min, clasificacion, genero, imagen_url, estado, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar película' });
    }
};

export const deletePelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM pelicula WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
        res.json({ message: 'Película eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar película' });
    }
};
