import { Juego } from "../models/Juego.models.js";
import { Consola } from "../models/Consolas.models.js";
import { Categoria } from "../models/Categorias.models.js";

export const crearJuego = async (req, res) => {
    try {
        const { nombre, id_consola, id_categoria, imagen, year, descripcion } = req.body;

        const juego = await Juego.create({
            nombre,
            id_consola,
            id_categoria,
            imagen,
            year,
            descripcion,
        });
        console.log(req.body);
        
        res.status(201).json({
            code: 201,
            message: "Juego creado correctamente",
            data: juego,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
};

export const obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.findAll({
            include: [
                {
                    model: Consola,
                    as: "consola"
                }, {
                    model: Categoria,
                    as: "categoria"
                }
            ],  
        },
    );

    const juegosMap = juegos.map(juego =>({
        id: juego.id,
        nombre: juego.nombre,
        consola: juego.consola.nombre,
        categoria: juego.categoria.nombre,
        imagen: juego.imagen,
        year: juego.year,
        descripcion: juego.descripcion

    }))

        res.status(200).json({
            code: 200,
            message: "Juegos obtenidos correctamente",
            data: juegosMap,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
};

export const updateJuego = async (req, res) => {
    try {
        const { nombre, consola, imagen, year, descripcion } = req.body;
        const { id } = req.params;

        const juegoActualizado = {
            nombre,
            consola,
            imagen,
            year,
            descripcion,
        };

        await Juego.update(juegoActualizado, {
            where: {
                id
            }
        });
        res.status(200).json({
            code: 200,
            message: "Juego modificado exitosamente",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
};

export const obtenerJuegoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const juego = await Juego.findOne({
            where: {
                id,
            },
        });

        if(!juego){
            return res.status(400).json({
                code: 400,
                message: "No existe ese juego en la base de datos",
            });

        }
        res.status(200).json({
            code: 200,
            message: "Juego obtenido correctamente",
            data: juego,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
};

export const deleteJuego = async (req, res) => {

    const { id } = req.params

    await Juego.destroy({
        where: {
            id
        }
    })
   
    try {
        res.status(200).json({
            code: 200,
            message: "Juego eliminado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        }); 
    }
}