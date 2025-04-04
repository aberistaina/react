import { Usuario } from "../models/Usuario.model.js"
import { normalizeEmail, normalizeRut } from "../utils/normalize.js"
import { validateUser, userExist } from "../services/validarUsuario.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { enviarCorreo } from "../utils/emails.js"

export const createUser = async(req, res) =>{
    try {
        const { nombre, apellido, email, telefono, rut, password} = req.body

        validateUser({ nombre, apellido, email, telefono, rut, password})
        await userExist(rut, email, telefono)


        const hash = bcrypt.hashSync(password, 10)
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email: normalizeEmail(email),
            telefono,
            rut: normalizeRut(rut),
            password: hash
        })

        const token = jwt.sign({
            data: email,
        },
        "secreto",
        {expiresIn : "30d"}
        )

        const usuario = `${nombre} ${apellido}`

        enviarCorreo(email, "registro", token, usuario)

        res.status(201).json({
            code: 201,
            message: "Usuario Creado Correctamente",
            data: nuevoUsuario,
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

export const login = async(req, res) =>{
    try {
        
        res.status(200).json({
            code: 200,
            message: "Inicio de sesión Exitoso",
            usuario: req.usuario,
            token: req.token
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

export const solicitarNuevaValidacion = async(req, res) =>{
    try {
        const { email } = req.body
        const usuario = Usuario.findOne({
            raw: true,
            where: {
                email
            }
        })
        if(!usuario){
            return res.status(400).json({
                code: 400,
                message: "El usuario no existe en la base de datos",
            })
        }

        if(usuario.validate){
            return res.status(400).json({
                code: 400,
                message: "El usuario ya está validado",
            })
        }

        const token = jwt.sign({
            data: email,
        },
        "secreto",
        {expiresIn : "30d"}
        )

        const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`
        enviarCorreo(email, "nuevaValidacion", token, nombreUsuario)

        res.status(200).json({
            code: 200,
            message: "Email de validación enviado correctamente",
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

export const solicitarNuevaContraseña = async(req, res) =>{
    try {
        const { email } = req.params

        const usuario = Usuario.findOne({
            raw: true,
            where: {
                email
            }
        })

        if(!usuario){
            return res.status(400).json({
                code: 400,
                message: "El usuario no existe en la base de datos",
            })
        }

        const token = jwt.sign({
            data: email,
        },
        "secreto",
        {expiresIn : "10m"}
        )

        const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`
        
        enviarCorreo(email, "recuperarPassword", token, nombreUsuario)

        res.status(200).json({
            code: 200,
            message: "Email Para restablecer contraseña enviado",
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

export const modificarPassword = async(req, res) =>{
    try {
        const { email, password } = req.body
        const user = await Usuario.findOne({
            where: {
                email
            }
        })
        
        if(!user){
            return res.status(400).json({
                code: 400,
                message: "El usuario no existe en la base de datos",
            })
        }

        const hash = bcrypt.hashSync(password, 10)

        await Usuario.update({
            password: hash
        }, {
            where: {
                email
            }
        })

        res.status(200).json({
            code: 200,
            message: "Contraseña modificada correctamente",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor",
        })
        
    }
}