import { Router } from "express";
import { createUser } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/", createUser)



export default router