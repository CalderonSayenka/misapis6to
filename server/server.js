import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.generalRoute = '/api'; // puede que haya un error

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
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
        // Aquí van las rutas (por ejemplo)
        // this.app.use(this.misapi, require('../routes/usuarios'));
        this.app.use(this.generalRoute,indexRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
