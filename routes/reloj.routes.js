import { Router } from "express";
import { 
  getAllRelojes,
  getRelojById,
  postReloj,
  putReloj,
  deleteReloj
} from "../controllers/reloj.controller.js";

const reloj = Router();

reloj.get("/", getAllRelojes);
reloj.get("/:id", getRelojById);
reloj.post("/", postReloj);
reloj.put("/:id", putReloj);
reloj.delete("/:id", deleteReloj);

export default reloj;