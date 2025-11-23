import { Router } from "express";
import {
  obtenerRelojes,
  crearReloj,
  actualizarReloj,
  eliminarReloj,
} from "../controllers/reloj.controller.js";

const router = Router();

router.get("/", obtenerRelojes);
router.post("/", crearReloj);
router.put("/:id", actualizarReloj);
router.delete("/:id", eliminarReloj);

export default router;
