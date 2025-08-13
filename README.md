# CarteleraYA

CarteleraYA es una aplicación web para la gestión de películas, compras de entradas y usuarios. El proyecto utiliza **Angular** para el frontend, **Node.js/Express** para el backend y **PostgreSQL** como base de datos. La aplicación está dockerizada para facilitar su despliegue y ejecución.

---

## Arquitectura del proyecto

### Backend
- **Tecnologías:** Node.js, Express, JWT para autenticación.
- **Funcionalidades:**
  - Registro y autenticación de usuarios.
  - CRUD de películas, compras y entradas.
  - Protección de rutas mediante JWT.
  - Conexión a PostgreSQL para almacenamiento persistente.
- **Ejecución:**
  - Se encuentra en el contenedor `carteleraya-backend`.
  - Escucha en el puerto `3000`.
  - Depende del contenedor de la base de datos.
- **Seguridad y validaciones implementadas:**
  - Autenticación y autorización mediante **JWT** (JSON Web Tokens) para proteger rutas sensibles del backend.
  - Validación de datos de entrada usando **express-validator**, asegurando que los usuarios envíen información correcta al registrarse o iniciar sesión, así como en la creación de compras, entradas y películas.
  - Manejo centralizado de errores para devolver respuestas consistentes ante peticiones inválidas o fallidas.

### Frontend
- **Tecnologías:** Angular 20, Angular Material, RouterModule.
- **Funcionalidades:**
  - Registro y login de usuarios.
  - Listado de películas.
  - Gestión de compras y entradas.
- **Configuración:**
  - SPA servida mediante **Nginx** en contenedor `carteleraya-frontend`.
  - Las rutas son gestionadas por Angular, asegurando que `/auth/login`, `/auth/register`.
  - Se utiliza prerender y build de producción para optimizar la carga.
  
### Base de datos
- **Tecnología:** PostgreSQL 17.5
- **Contenedor:** `carteleraya-db`.
- **Funcionalidades:**
  - Almacenamiento de usuarios, películas, compras y entradas.
  - Inicialización automática mediante script `init.sql`.
- **Acceso:** Puerto `5432`, credenciales definidas en `.env`.

---

## Docker
El proyecto utiliza **Docker Compose** para levantar los tres servicios: base de datos, backend y frontend.

- **Comandos principales**
```bash
docker-compose up -d --build
docker-compose logs -f
```

- **Levantar todo (primera vez o después de reset)**
```bash
docker-compose up --build
```
- **Apagar sin perder datos**
```bash 
docker-compose down
```
- **Encender de nuevo**
```bash
docker-compose up -d
```
- **Resetear base de datos (ejecuta otra vez init.sql)**
```bash
docker-compose down -v
docker-compose up --build
```
- **Probrar testdb.js** 
```bash
docker-compose exec backend sh
node src/testdb.js
```

- **Comprobar nombres (NAMES) de la base de datos**
```bash
docker ps
```
- **Ejecuta el siguiente comando para abrir una terminal interactiva dentro del contenedor y entrar a psql**
```bash
docker exec -it <nombre_contenedor_postgres> psql -U <usuario> -d carteleraya
docker exec -it carteleraya-db psql -U admin -d carteleraya
```

- **Ya dentro del prompt de psql (verás algo como carteleraya=#), pega la consulta SQL para crear el usuario admin:**
```sql
INSERT INTO usuario (nombre, apellido, email, telefono, contrasena, rol)
VALUES (
  'Diego', 
  'Ortega', 
  'diego.ortega@example.com', 
  '3023334444', 
  '$2b$10$1Vx1rqGoW01nQORmrntsVekCdkllmCID1uvEQ5otGgODwUJEw67Lm', 
  'admin'
);
```

- **Para actualizar el usuario Laura y darle rol admin:**
```sql
UPDATE usuario SET rol = 'admin' WHERE email = 'laura.diaz@example.com';
```

- **links**
```bash
http://localhost:3000
http://localhost:3000/api/peliculas
```
