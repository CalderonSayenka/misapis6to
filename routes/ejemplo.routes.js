import {Router}from 'express';
import {deleteEjemplo, getAllEjemplos,getEjemploById, postEjemplo, putEjemplo} from '../controllers/ejemplo.controller.js';
const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);


// GET con parámetro :id
ejemplo.get('/:id', getEjemploById);

// PUT
ejemplo.put('/:id', putEjemplo);

// POST
ejemplo.post('/', postEjemplo);

// DELETE
ejemplo.delete('/:id', deleteEjemplo);

export default ejemplo;
