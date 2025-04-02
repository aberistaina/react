import { Router } from "express";
import { getUsuarioById, validarUsuario } from "../controllers/usuario.controllers.js";
import { verificarToken } from "../middlewares/login.middleware.js";


const router = Router()

router.get("/:id", verificarToken, getUsuarioById)
router.get("/validar-usuario/:email", verificarToken, validarUsuario)


export default router