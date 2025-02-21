import { Juego } from "../models/Juego.models.js"

export const crearJuego = async(req, res) =>{
    try {
        const { nombre, consola, imagen, year, descripcion} = req.body

        const juego = await Juego.create({
            nombre,
            consola,
            imagen, 
            year,
            descripcion
        })

        res.status(201).json({
            code: 201,
            message: "Juego creado correctamente",
            data: juego
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor"
            
        })
    }
}

export const obtenerJuegos = async(req, res) =>{
    try {
        
        const juegos = await Juego.findAll()

        res.status(200).json({
            code: 200,
            message: "Juegos obtenidos correctamente",
            data: juegos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            message: "Hubo un error en el servidor"
            
        })
    }
}