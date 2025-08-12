import pool from '../db.js';

export const getPeliculas = async (req, res) => {
    const result = await pool.query('SELECT * FROM pelicula ORDER BY id ASC');
    res.json(result.rows);
};

export const getPelicula = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pelicula WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(result.rows[0]);
};

export const createPelicula = async (req, res) => {
    const { titulo, descripcion, duracion, clasificacion, genero, fecha_estreno, estado } = req.body;
    const result = await pool.query(
        'INSERT INTO pelicula (titulo, descripcion, duracion, clasificacion, genero, fecha_estreno, estado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [titulo, descripcion, duracion, clasificacion, genero, fecha_estreno, estado ?? true]
    );
    res.status(201).json(result.rows[0]);
};

export const updatePelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, duracion, clasificacion, genero, fecha_estreno, estado } = req.body;
    const result = await pool.query(
        `UPDATE pelicula 
        SET titulo=$1, descripcion=$2, duracion=$3, clasificacion=$4, genero=$5, fecha_estreno=$6, estado=$7
        WHERE id=$8 RETURNING *`,
        [titulo, descripcion, duracion, clasificacion, genero, fecha_estreno, estado, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(result.rows[0]);
};

export const deletePelicula = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pelicula WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.json({ message: 'Película eliminada' });
};
