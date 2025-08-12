import pool from '../db.js';

export const getEntradas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entrada ORDER BY id ASC');
        res.json(result.rows);
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
