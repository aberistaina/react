import express from "express"
import cors from "cors"
import juegosRoutes from "./routes/juegos.routes.js"


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
