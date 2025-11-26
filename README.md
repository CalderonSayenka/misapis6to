Whatches Lux — Sistema de Gestión de Relojes (CRUD)

Whatches Lux es un sistema completo para la gestión de relojes de lujo, desarrollado con Node.js, Express y MongoDB en el backend, y HTML/CSS/JS en el frontend.
Permite crear, listar, actualizar y eliminar relojes desde una interfaz web responsiva.

🚀 Características Principales

✔ API RESTful con CRUD completo
✔ Gestión de relojes con campos: marca, modelo, precio, imagen, características, fecha de lanzamiento y empresa
✔ Frontend con HTML, Bootstrap y JavaScript vanilla
✔ Manejo de datos con async/await (fetch)
✔ Conexión a MongoDB usando Mongoose
✔ Servidor ejecutado con nodemon

🛠 Tecnologías Utilizadas
Backend

Node.js

Express

MongoDB + MongoDB Atlas

Mongoose

Nodemon

Frontend

HTML5

CSS3

Bootstrap

JavaScript (ES6)

📁 Modelo de Datos (Reloj)

Este es el esquema utilizado en MongoDB:

const relojSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: false },
  características: { type: [String], required: false },
  fechaLanzamiento: { type: Date, required: false },
  empresa: {
    type: String,
    default: "Whatches Lux Inc.",
  },
});

⚙️ Instalación y Ejecución del Backend
1. Clonar el repositorio
git clone https://github.com/CalderonSayenka/misapis6to.git
cd tu_repositorio

2. Instalar dependencias
npm install

3. Crear archivo .env

En la raíz del proyecto crea:

PORT=3000
MONGODB_URI

4. Ejecutar el servidor

Usando nodemon:

nodemon ./index.js


El backend iniciará en:

http://localhost:3000

🔗 Rutas de la API (REST — /api/relojes)
Método	Ruta	Descripción
GET	/api/relojes	Obtiene todos los relojes
GET	/api/relojes/:id	Obtiene un reloj específico
POST	/api/relojes	Crea un nuevo reloj
PUT	/api/relojes/:id	Actualiza un reloj existente
DELETE	/api/relojes/:id	Elimina un reloj

🎨 Frontend (Cliente Web)

El frontend incluye:

✔ Vista de lista de relojes
✔ Formulario para agregar relojes
✔ Funciones para editar y eliminar
✔ Diseños responsivos con Bootstrap
✔ Consumición de API con fetch + async/await

Para abrirlo, solo inicia tu servidor y luego abre:

public/index.html

📂 Estructura del Proyecto
📁 misapis
 ├── 📁 controllers
 ├── 📁 db
 ├── 📁 models
 │      reloj.model.js
 ├── 📁 public
 │      index.html
 │      relojes.js
 │      css/
 ├── 📁 routes
 │      reloj.routes.js
 ├── server/
 │      server.js
 │      index.js
 ├── .env
 ├── package.json


👤 Autor
CalderonSayenka
Proyecto académico — CRUD Whatches Lux.
