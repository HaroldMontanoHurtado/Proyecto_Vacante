import pool from '../db.js';

export const getCompras = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            usuario_id,
            estado,
            fecha_inicio,
            fecha_fin
        } = req.query;

        let baseQuery = 'SELECT * FROM compra';
        const conditions = [];
        const values = [];

        if (usuario_id) {
            values.push(usuario_id);
            conditions.push(`usuario_id = $${values.length}`);
        }

        if (estado) {
            values.push(estado);
            conditions.push(`estado = $${values.length}`);
        }

        if (fecha_inicio) {
            values.push(fecha_inicio);
            conditions.push(`fecha >= $${values.length}`);
        }

        if (fecha_fin) {
            values.push(fecha_fin);
            conditions.push(`fecha <= $${values.length}`);
        }

        if (conditions.length > 0) {
            baseQuery += ' WHERE ' + conditions.join(' AND ');
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        values.push(limit, offset);

        baseQuery += ` ORDER BY id ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const result = await pool.query(baseQuery, values);

        let countQuery = 'SELECT COUNT(*) FROM compra';
        if (conditions.length > 0) {
            countQuery += ' WHERE ' + conditions.join(' AND ');
        }
        const countResult = await pool.query(countQuery, values.slice(0, values.length - 2));

        res.json({
            total: parseInt(countResult.rows[0].count),
            page: parseInt(page),
            limit: parseInt(limit),
            compras: result.rows
        });

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
