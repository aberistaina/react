import { Router } from "express";
import { crearJuego, deleteJuego, obtenerJuegoPorId, obtenerJuegos, updateJuego } from "../controllers/juegos.controllers.js";

const router = Router()

router.get("/", obtenerJuegos)
router.get("/:id", obtenerJuegoPorId)
router.put("/:id", updateJuego)
router.delete("/:id", deleteJuego)
router.post("/", crearJuego)


export default router