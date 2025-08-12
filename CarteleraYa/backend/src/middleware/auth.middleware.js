import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({ message: "Autenticación requerida" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        req.user = user;
        next();
    });
};

const verifyRole = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
    }
    if (!req.user.rol || !roles.includes(req.user.rol)) {
        return res.status(403).json({ message: "No tienes permisos para esta acción" });
    }
    next();
};

export const authMiddleware = { verifyToken, verifyRole };
