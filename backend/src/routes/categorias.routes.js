import { Router } from "express";
import { createCategorias, getCategorias } from "../controllers/categoria.controllers.js";

const router = Router()

router.get("/", getCategorias)
router.post("/", createCategorias)



export default router