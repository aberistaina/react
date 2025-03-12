import { Categoria } from "../models/Categorias.models.js";

export const getCategorias = async(req, res) =>{
    try {

        const categoria = await Categoria.findAll()
        res.status(200).json({
            code: 200,
            message: "Categoria obtenidas con éxito",
            data: categoria,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
}

export const createCategorias = async(req, res) =>{
    try {

        const { nombre } = req.body
        const nuevaCategoria = await Categoria.create({
            nombre
        })
        res.status(201).json({
            code: 201,
            message: "Categoria creada correctamente",
            data: nuevaCategoria,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor",
        });
    }
}
