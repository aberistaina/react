import { Router } from "express";
import { crearJuego, obtenerJuegos } from "../controllers/juegos.controllers.js";

const router = Router()

router.get("/", obtenerJuegos)
router.post("/", crearJuego)


export default router