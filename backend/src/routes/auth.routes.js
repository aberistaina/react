import { Router } from "express";
import { createUser, login, modificarPassword, solicitarNuevaContraseña } from "../controllers/auth.controllers.js";
import { emitirToken, verificarToken } from "../middlewares/login.middleware.js";

const router = Router()

router.post("/", createUser)
router.post("/login", emitirToken, login)
router.post("/recuperar-password/:email", solicitarNuevaContraseña)
router.post("/modificar-password", verificarToken,  modificarPassword)



export default router