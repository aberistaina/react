import { Consola } from "../models/Consolas.models.js";

export const getConsolas = async(req, res) =>{
    try {

        const consolas = await Consola.findAll()
        res.status(200).json({
            code: 200,
            message: "Consolas obtenidas con éxito",
            data: consolas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
}

export const createConsola = async(req, res) =>{
    try {

        const { nombre } = req.body
        const nuevaConsola = await Consola.create({
            nombre
        })
        res.status(201).json({
            code: 201,
            message: "Consolas creada correctamente",
            data: nuevaConsola,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
}

