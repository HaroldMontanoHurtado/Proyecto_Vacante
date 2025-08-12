import pool from '../db.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, email } = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const offset = (pageNumber - 1) * limitNumber;

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

        const totalQuery = await pool.query(`SELECT COUNT(*) FROM usuario ${whereClause}`, valores);
        const total = parseInt(totalQuery.rows[0].count, 10);

        const usuariosQuery = await pool.query(
            `SELECT id, nombre, apellido, email, telefono, rol FROM usuario ${whereClause} ORDER BY id ASC LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`,
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
        const result = await pool.query(
            'SELECT id, nombre, apellido, email, telefono, rol FROM usuario WHERE id = $1',
            [id]
        );
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

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const result = await pool.query(
            'INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, nombre, email, rol',
            [nombre, apellido, email, telefono, hashedPassword, rol]
        );

        res.status(201).json({ message: "Usuario creado", usuario: result.rows[0] });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, contrasena, rol, activo } = req.body;

        let hashedPassword = null;
        if (contrasena) {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        }

        // Construir query dinámicamente para solo actualizar campos que vienen
        const campos = [];
        const valores = [];
        let idx = 1;

        if (nombre !== undefined) {
            campos.push(`nombre = $${idx++}`);
            valores.push(nombre);
        }
        if (apellido !== undefined) {
            campos.push(`apellido = $${idx++}`);
            valores.push(apellido);
        }
        if (email !== undefined) {
            campos.push(`email = $${idx++}`);
            valores.push(email);
        }
        if (telefono !== undefined) {
            campos.push(`telefono = $${idx++}`);
            valores.push(telefono);
        }
        if (hashedPassword !== null) {
            campos.push(`contrasena = $${idx++}`);
            valores.push(hashedPassword);
        }
        if (rol !== undefined) {
            campos.push(`rol = $${idx++}`);
            valores.push(rol);
        }
        if (activo !== undefined) {
            campos.push(`activo = $${idx++}`);
            valores.push(activo);
        }

        if (campos.length === 0) {
            return res.status(400).json({ message: "No se enviaron campos para actualizar" });
        }

        valores.push(id);
        const query = `UPDATE usuario SET ${campos.join(', ')} WHERE id = $${idx} RETURNING id, nombre, email, rol`;

        const result = await pool.query(query, valores);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: "Usuario actualizado", usuario: result.rows[0] });
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
