# CarteleraYa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Codigos esensiales

## Levantar todo (primera vez o después de reset):
```bash
docker-compose up --build
```
## Apagar sin perder datos:
```bash 
docker-compose down
```
## Encender de nuevo:
```bash
docker-compose up -d
```
## Resetear base de datos (ejecuta otra vez init.sql):
```bash
docker-compose down -v
docker-compose up --build
```
## Probrar testdb.js 
```bash
docker-compose exec backend sh
node src/testdb.js
```

# Comprobar nombres (NAMES) de la base de datos:
```bash
docker ps
```
# Ejecuta el siguiente comando para abrir una terminal interactiva dentro del contenedor y entrar a psql:
```bash
docker exec -it <nombre_contenedor_postgres> psql -U <usuario> -d carteleraya
docker exec -it carteleraya-db psql -U admin -d carteleraya
```

# Ya dentro del prompt de psql (verás algo como carteleraya=#), pega la consulta SQL para crear el usuario admin:
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

# Para actualizar el usuario Laura y darle rol admin:
```sql
UPDATE usuario SET rol = 'admin' WHERE email = 'laura.diaz@example.com';
```

## link
```bash
http://localhost:3000
http://localhost:3000/api/peliculas
```

CarteleraYa/
 └─ src/
     └─ app/
         ├─ admin/                 # Sin Angular Material
         │   ├─ admin.module.ts    # Es necesario este archivo?
         │   └─ ...                
         ├─ auth/                  # Con Angular Material
         │   ├─ auth.module.ts     # Importa MaterialModule
         │   └─ ...
         ├─ compras/               # Con Angular Material
         │   ├─ compras.module.ts  # Importa MaterialModule
         │   └─ ...
         ├─ core/                  # Servicios, guardas, interceptores
         ├─ entradas/              # Con Angular Material
         │   ├─ entradas.module.ts # Importa MaterialModule
         │   └─ ...
         ├─ peliculas/             # Con Angular Material
         │   ├─ peliculas.module.ts# Importa MaterialModule
         │   └─ ...
         ├─ services/              # Servicios específicos
         ├─ shared/                # MaterialModule y demás utilidades compartidas
         │   ├─ material.module.ts
         │   └─ ...
         ├─ app.component.ts
         ├─ app.module.ts
         └─ app-routing.module.ts
