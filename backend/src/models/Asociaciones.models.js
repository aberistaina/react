import { Categoria } from "./Categorias.models.js";
import { Juego } from "./Juego.models.js";
import { Consola } from "./Consolas.models.js";


Juego.belongsTo(Consola, {
    foreignKey: "id_consola",
    as:"consola"
})

Juego.belongsTo(Categoria, {
    foreignKey: "id_categoria",
    as:"categoria"
})