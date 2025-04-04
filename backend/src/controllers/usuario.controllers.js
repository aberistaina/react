import { Usuario } from "../models/Usuario.model.js"
import { enviarCorreo } from "../utils/emails.js"
import bcrypt from "bcrypt"


export const getUsuarioById = async(req, res) =>{
    try {
        
        const { id } = req.params

        const usuario = await Usuario.findOne({
            attributes:["nombre", "apellido", "email", "telefono", "rut"],
            where:{
                id
            }
        })

        if(!usuario){
            return res.status(400).json({
                code: 400,
                message: `El usuario con id ${id} no se encuentra en la base de datos`,
    
            })
        }


        res.status(200).json({
            code: 200,
            message: "Usuario encontrado con éxito",
            data: usuario

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor",
            error: error.message
        })
    }
}

export const validarUsuario = async(req, res) =>{
    try {
        const { email } = req.params


        const usuario = await Usuario.findOne({
            raw: true,
            where:{
                email
            }
        })

        if(!usuario){
            return res.status(400).json({
                code: 400,
                message: "No existe el usuario en la base de datos",
            })
        }

        if(usuario.validate){
            return res.status(400).json({
                code: 400,
                message: "El usuario ya está validado",
                data: usuario
            })
        }

        await Usuario.update(
            { validate: true },
            { where: { email } }
        );

        
        res.status(200).json({
            code: 200,
            message: "Usuario Validado con éxito",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor",
            error: error.message
        })
    }
}

export const recuperarContraseña = async(req, res) =>{
    try {

        const { email } = req.params
        const { contraseña } = req.body

        const usuario = Usuario.findOne({
            where:{
                email
            }
        })

        if(!usuario){
            return res.status(400).json({
                code:400, 
                message: "El usuario no existe en la base de datos"
            })
        }

        const hash = bcrypt.hashSync(contraseña, 10)

        await Usuario.update(
            { password: hash },
            { where: { email } }
        );

        res.status(200).json({
            code:200, 
            message: "Contraseña modificada con éxito"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code:500, 
            message: "Hubo un error interno en el servidor"
        })
    }
}

