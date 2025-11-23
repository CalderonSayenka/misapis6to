import ejemplo from './ejemplo.routes.js';
import reloj from './reloj.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('./ejemplo', ejemplo);
indexRoutes.use("/relojes", reloj);
export default indexRoutes;