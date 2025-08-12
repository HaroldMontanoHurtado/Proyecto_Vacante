import pool from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, email } = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const offset = (pageNumber - 1) * limitNumber;

        // Construir filtros dinámicos
        let filtros = [];
        let valores = [];

        if (nombre) {
            filtros.push(`nombre ILIKE $${filtros.length + 1}`);
            valores.push(`%${nombre}%`);
        }

        if (email) {
            filtros.push(`email ILIKE $${filtros.length + 1}`);
            valores.push(`%${email}%`);
        }

        const whereClause = filtros.length > 0 ? `WHERE ${filtros.join(' AND ')}` : '';

        // Consulta para total de registros (para paginación)
        const totalQuery = await pool.query(`SELECT COUNT(*) FROM usuario ${whereClause}`, valores);
        const total = parseInt(totalQuery.rows[0].count, 10);

        // Consulta para obtener usuarios paginados
        const usuariosQuery = await pool.query(
            `SELECT * FROM usuario ${whereClause} ORDER BY id ASC LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`,
            [...valores, limitNumber, offset]
        );

        res.json({
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(total / limitNumber),
            usuarios: usuariosQuery.rows,
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, contrasena, rol } = req.body;
        const result = await pool.query(
            'INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [nombre, apellido, email, telefono, contrasena, rol]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, contrasena, rol, activo } = req.body;
        const result = await pool.query(
            `UPDATE usuario 
            SET nombre=$1, apellido=$2, email=$3, telefono=$4, contrasena=$5, rol=$6, activo=$7 
            WHERE id=$8 RETURNING *`,
            [nombre, apellido, email, telefono, contrasena, rol, activo, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};
