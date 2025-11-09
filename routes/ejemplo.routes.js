import { Router } from 'express';

const ejemplo = Router();

// GET general
ejemplo.get('/', (req, res) => {
    res.json({
        msg: 'get API'
    });
});

// GET con parámetro :id
ejemplo.get('/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        msg: 'get API',
        id
    });
});

// PUT
ejemplo.put('/', (req, res) => {
    const body = req.body;

    res.json({
        msg: 'put API',
        body
    });
});

// POST
ejemplo.post('/', (req, res) => {
    const body = req.body;

    res.json({
        msg: 'post API',
        body
    });
});

// DELETE
ejemplo.delete('/', (req, res) => {
    res.json({
        msg: 'delete API'
    });
});

export default ejemplo;
