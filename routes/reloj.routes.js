import { Router } from "express";
import {
  obtenerRelojes,
  obtenerRelojPorId,
  crearReloj,
  actualizarReloj,
  eliminarReloj,
} from "../controllers/reloj.controller.js";

const router = Router();

router.get("/", obtenerRelojes);
router.get("/relojes/:id", obtenerRelojPorId);
router.post("/", crearReloj);
router.put("/:id", actualizarReloj);
router.delete("/:id", eliminarReloj);

export default router;
