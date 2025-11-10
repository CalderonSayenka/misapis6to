import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js'; // Asegúrate que esta ruta sea correcta

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api';

        // Conectar a la base de datos
        this.conectarDBMongo();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDBMongo() {
        if (!db.isConected) {
            await db.conectarAMongoDB();
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // Rutas principales
        this.app.use(this.generalRoute, indexRoutes);

        //  esto esta mal creo ( talves sea use en ves de all)
        this.app.use('', (req, res) => {
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
