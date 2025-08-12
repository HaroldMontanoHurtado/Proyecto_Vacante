import pool from '../db.js';

export const getUsuarios = async (req, res) => {
    const result = await pool.query('SELECT * FROM usuario ORDER BY id ASC');
    res.json(result.rows);
};

export const getUsuario = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
};

export const createUsuario = async (req, res) => {
    const { nombre, apellido, email, telefono, contrasena, rol } = req.body;
    const result = await pool.query(
        'INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [nombre, apellido, email, telefono, contrasena, rol]
    );
    res.status(201).json(result.rows[0]);
};

export const updateUsuario = async (req, res) => {
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
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
};
