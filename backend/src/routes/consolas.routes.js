import { Router } from "express";
import { createConsola, getConsolas } from "../controllers/consolas.controllers.js";

const router = Router()

router.get("/", getConsolas)
router.post("/", createConsola)



export default router