import pool from '../db.js';

export const getCompras = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM compra ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener compras:', error);
        res.status(500).json({ message: 'Error al obtener compras' });
    }
};

export const getCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM compra WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener compra:', error);
        res.status(500).json({ message: 'Error al obtener compra' });
    }
};

export const createCompra = async (req, res) => {
    try {
        const { usuario_id, total, metodo_pago, estado } = req.body;

        if (!usuario_id || total == null || !metodo_pago) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: usuario_id, total o metodo_pago' });
        }

        const result = await pool.query(
            `INSERT INTO compra (usuario_id, total, metodo_pago, estado)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [usuario_id, total, metodo_pago, estado || 'confirmado']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear compra:', error);
        res.status(500).json({ message: 'Error al crear compra' });
    }
};

export const updateCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, total, metodo_pago, estado } = req.body;

        if (!usuario_id || total == null || !metodo_pago) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: usuario_id, total o metodo_pago' });
        }

        const result = await pool.query(
            `UPDATE compra
            SET usuario_id=$1, total=$2, metodo_pago=$3, estado=$4
            WHERE id=$5 RETURNING *`,
            [usuario_id, total, metodo_pago, estado, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar compra:', error);
        res.status(500).json({ message: 'Error al actualizar compra' });
    }
};

export const deleteCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM compra WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
        res.json({ message: 'Compra eliminada' });
    } catch (error) {
        console.error('Error al eliminar compra:', error);
        res.status(500).json({ message: 'Error al eliminar compra' });
    }
};
