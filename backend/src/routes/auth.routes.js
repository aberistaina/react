import { Router } from "express";
import { createUser, login } from "../controllers/auth.controllers.js";
import { emitirToken } from "../middlewares/login.middleware.js";

const router = Router()

router.post("/", createUser)
router.post("/login", emitirToken, login)



export default router