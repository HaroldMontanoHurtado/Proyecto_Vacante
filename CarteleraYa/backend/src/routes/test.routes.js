import express from 'express';
import pool from '../db.js'; // tu conexión PG
const router = express.Router();

router.get('/test-db', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT NOW()');
        res.json({ ok: true, time: rows[0].now });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

export default router;
