import Reloj from "../models/reloj.model.js";
import mongoose from "mongoose";
import express from 'express';

// GET TODOS LOS RELOJES
export const getAllRelojes = async (req, res) => {
    console.log("GET TODOS LOS RELOJES");

    try {
        const relojes = await Reloj.find({}, { __v: 0 });

        if (relojes.length === 0) {
            return res.status(404).json({ msg: "No se encontraron relojes" });
        }

        return res.status(200).json({ relojes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al obtener los relojes" });
    }
};

// GET RELOJ POR ID
export const getRelojById = async (req, res) => {
    console.log("GET RELOJ POR ID");
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reloj = await Reloj.findById(id);

        if (!reloj) {
            return res.status(404).json({ msg: "Reloj no encontrado" });
        }

        return res.status(200).json({ reloj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al obtener el reloj" });
    }
};

// POST CREAR RELOJ
export const postReloj = async (req, res) => {
    console.log("POST RELOJ");
    const body = req.body;
    const reloj = new Reloj(body);

    try {
        // Validación manual por si hay campos incorrectos
        const validationError = reloj.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(
                (err) => err.message
            );
            return res.status(400).json({ error: errorMessages });
        }

        await reloj.save();
        return res.status(201).json({ reloj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al guardar el reloj" });
    }
};

// PUT ACTUALIZAR RELOJ
export const putReloj = async (req, res) => {
    console.log("PUT RELOJ");
    const id = req.params.id;
    const body = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reloj = await Reloj.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!reloj) {
            return res.status(404).json({ msg: "Reloj no encontrado" });
        }

        return res.status(200).json({ reloj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al actualizar el reloj" });
    }
};

// DELETE ELIMINAR RELOJ
export const deleteReloj = async (req, res) => {
    console.log("DELETE RELOJ");
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const reloj = await Reloj.findByIdAndDelete(id);

        if (!reloj) {
            return res.status(404).json({ msg: "Reloj no encontrado" });
        }

        return res.status(200).json({ msg: "Reloj eliminado", reloj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al eliminar el reloj" });
    }
};