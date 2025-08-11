-- Activar extensión para generar UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Crear tablas
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin')),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pelicula (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion_min INTEGER NOT NULL CHECK (duracion_min > 0),
    clasificacion VARCHAR(10),
    genero VARCHAR(30),
    imagen_url TEXT,
    estado VARCHAR(10) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compra (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    metodo_pago VARCHAR(20) NOT NULL,
    estado VARCHAR(15) DEFAULT 'confirmado' CHECK (estado IN ('confirmado', 'cancelado')),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE RESTRICT
);

CREATE TABLE entrada (
    id BIGSERIAL PRIMARY KEY,
    compra_id BIGINT NOT NULL,
    pelicula_id BIGINT NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    fecha_funcion DATE NOT NULL,
    codigo_ticket VARCHAR(36) DEFAULT gen_random_uuid() UNIQUE,
    FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id) ON DELETE RESTRICT
);

-- 2. Insertar datos iniciales
INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol)
VALUES
('Juan', 'Pérez', 'juan@example.com', '3001234567', '123456', 'cliente'),
('Ana', 'López', 'ana@example.com', '3019876543', '123456', 'admin');

INSERT INTO pelicula (titulo, descripcion, duracion_min, clasificacion, genero, imagen_url)
VALUES
('Inception', 'Un ladrón roba secretos a través de los sueños.', 148, 'PG-13', 'Ciencia Ficción', 'https://example.com/inception.jpg'),
('Avatar', 'Un exmarine explora un mundo alienígena.', 162, 'PG-13', 'Aventura', 'https://example.com/avatar.jpg');

INSERT INTO compra (usuario_id, total, metodo_pago, estado)
VALUES
(1, 30000, 'tarjeta', 'confirmado'),
(2, 15000, 'efectivo', 'confirmado');

INSERT INTO entrada (compra_id, pelicula_id, cantidad, precio_unitario, fecha_funcion)
VALUES
(1, 1, 2, 15000, '2025-08-15'),
(2, 2, 1, 15000, '2025-08-16');
