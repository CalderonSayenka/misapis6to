import mongoose from "mongoose";

const relojSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,      
    required: false,
  },
  caracteristicas: {
    type: [String],
    required: false,
  },
  fechaLanzamiento: {
    type: Date,
    required: false,
  },
  empresa: {
    type: String,
    default: "Whatches Lux Inc.",
  },
});

const Reloj = mongoose.model("Reloj", relojSchema);

export default Reloj;