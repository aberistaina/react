import express from "express"
import cors from "cors"
import juegosRoutes from "./routes/juegos.routes.js"
import consolasRoutes from "./routes/consolas.routes.js"
import categoriasRoutes from "./routes/categorias.routes.js"
import usuariosRoutes from "./routes/usuario.routes.js"
import authRoutes from "./routes/auth.routes.js"

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express()


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//Carpeta Publica
app.use("/public", express.static(__dirname + "/public"));

//Endpoints

app.use("/api/v1/juegos", juegosRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/consolas", consolasRoutes)
app.use("/api/v1/categorias", categoriasRoutes)
app.use("/api/v1/usuarios", usuariosRoutes)
