import Reloj from "../models/reloj.model.js";

// Obtener todos los relojes
export const obtenerRelojes = async (req, res) => {
  try {
    const relojes = await Reloj.find();
    res.json(relojes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los relojes", error });
  }
};

// Crear un nuevo reloj
export const crearReloj = async (req, res) => {
  try {
    const nuevoReloj = new Reloj(req.body);
    await nuevoReloj.save();
    res.status(201).json(nuevoReloj);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el reloj", error });
  }
};

// Actualizar un reloj por ID
export const actualizarReloj = async (req, res) => {
  try {
    const relojActualizado = await Reloj.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(relojActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el reloj", error });
  }
};

// Eliminar un reloj
export const eliminarReloj = async (req, res) => {
  try {
    await Reloj.findByIdAndDelete(req.params.id);
    res.json({ message: "Reloj eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el reloj", error });
  }
};
