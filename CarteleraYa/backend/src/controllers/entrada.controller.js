import pool from '../db.js';

export const getEntradas = async (req, res) => {
    const result = await pool.query('SELECT * FROM entrada ORDER BY id ASC');
    res.json(result.rows);
};

export const getEntrada = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM entrada WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });
    res.json(result.rows[0]);
};

export const createEntrada = async (req, res) => {
    const { compra_id, pelicula_id, asiento, precio } = req.body;
    const result = await pool.query(
        'INSERT INTO entrada (compra_id, pelicula_id, asiento, precio) VALUES ($1,$2,$3,$4) RETURNING *',
        [compra_id, pelicula_id, asiento, precio]
    );
    res.status(201).json(result.rows[0]);
};

export const updateEntrada = async (req, res) => {
    const { id } = req.params;
    const { compra_id, pelicula_id, asiento, precio } = req.body;
    const result = await pool.query(
        'UPDATE entrada SET compra_id=$1, pelicula_id=$2, asiento=$3, precio=$4 WHERE id=$5 RETURNING *',
        [compra_id, pelicula_id, asiento, precio, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });
    res.json(result.rows[0]);
};

export const deleteEntrada = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM entrada WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });
    res.json({ message: 'Entrada eliminada' });
};
