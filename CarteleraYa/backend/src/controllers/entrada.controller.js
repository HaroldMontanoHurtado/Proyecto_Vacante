import pool from '../db.js';

export const getEntradas = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            compra_id,
            pelicula_id,
            fecha_funcion
        } = req.query;

        let baseQuery = 'SELECT * FROM entrada';
        const conditions = [];
        const values = [];

        if (compra_id) {
            values.push(compra_id);
            conditions.push(`compra_id = $${values.length}`);
        }

        if (pelicula_id) {
            values.push(pelicula_id);
            conditions.push(`pelicula_id = $${values.length}`);
        }

        if (fecha_funcion) {
            values.push(fecha_funcion);
            conditions.push(`fecha_funcion = $${values.length}`);
        }

        if (conditions.length > 0) {
            baseQuery += ' WHERE ' + conditions.join(' AND ');
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        values.push(limit, offset);

        baseQuery += ` ORDER BY id ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const result = await pool.query(baseQuery, values);

        let countQuery = 'SELECT COUNT(*) FROM entrada';
        if (conditions.length > 0) {
            countQuery += ' WHERE ' + conditions.join(' AND ');
        }
        const countResult = await pool.query(countQuery, values.slice(0, values.length - 2));

        res.json({
            total: parseInt(countResult.rows[0].count),
            page: parseInt(page),
            limit: parseInt(limit),
            entradas: result.rows
        });

    } catch (error) {
        console.error('Error al obtener entradas:', error);
        res.status(500).json({ message: 'Error al obtener entradas' });
    }
};

export const getEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM entrada WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener entrada:', error);
        res.status(500).json({ message: 'Error al obtener entrada' });
    }
};

export const createEntrada = async (req, res) => {
    try {
        const { compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion } = req.body;

        if (!compra_id || !pelicula_id || !cantidad || !precio_unitario || !fecha_funcion) {
            return res.status(400).json({ message: 'Faltan campos obligatorios en la entrada' });
        }

        const result = await pool.query(
            `INSERT INTO entrada (compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear entrada:', error);
        res.status(500).json({ message: 'Error al crear entrada' });
    }
};

export const updateEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        const { compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion } = req.body;

        if (!compra_id || !pelicula_id || !cantidad || !precio_unitario || !fecha_funcion) {
            return res.status(400).json({ message: 'Faltan campos obligatorios en la entrada' });
        }

        const result = await pool.query(
            `UPDATE entrada
       SET compra_id=$1, pelicula_id=$2, cantidad=$3, precio_unitario=$4, fecha_funcion=$5
       WHERE id=$6 RETURNING *`,
            [compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar entrada:', error);
        res.status(500).json({ message: 'Error al actualizar entrada' });
    }
};

export const deleteEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM entrada WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Entrada no encontrada' });
        res.json({ message: 'Entrada eliminada' });
    } catch (error) {
        console.error('Error al eliminar entrada:', error);
        res.status(500).json({ message: 'Error al eliminar entrada' });
    }
};
