import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

// Registro
export const register = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, contrasena, rol } = req.body;

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const result = await pool.query(
            `INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, email, rol`,
            [nombre, apellido, email, telefono, hashedPassword, rol || "usuario"]
        );

        res.status(201).json({ message: "Usuario registrado", usuario: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error registrando usuario", error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        const result = await pool.query(`SELECT * FROM usuario WHERE email = $1`, [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const usuario = result.rows[0];
        const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el login", error: error.message });
    }
};
