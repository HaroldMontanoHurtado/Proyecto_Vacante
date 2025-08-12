import pool from '../db.js';

export const getCompras = async (req, res) => {
    const result = await pool.query('SELECT * FROM compra ORDER BY id ASC');
    res.json(result.rows);
};

export const getCompra = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM compra WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(result.rows[0]);
};

export const createCompra = async (req, res) => {
    const { usuario_id, fecha, total } = req.body;
    const result = await pool.query(
        'INSERT INTO compra (usuario_id, fecha, total) VALUES ($1, $2, $3) RETURNING *',
        [usuario_id, fecha ?? new Date(), total]
    );
    res.status(201).json(result.rows[0]);
};

export const updateCompra = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, fecha, total } = req.body;
    const result = await pool.query(
        'UPDATE compra SET usuario_id=$1, fecha=$2, total=$3 WHERE id=$4 RETURNING *',
        [usuario_id, fecha, total, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(result.rows[0]);
};

export const deleteCompra = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM compra WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json({ message: 'Compra eliminada' });
};
