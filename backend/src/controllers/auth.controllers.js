import { Usuario } from "../models/Usuario.model.js"
import { normalizeEmail, normalizeRut } from "../utils/normalize.js"
import { validateUser, userExist } from "../services/validarUsuario.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
        const url = `http://localhost:5173/validar-usuario/${email}?token=${token}`

        res.status(201).json({
            code: 201,
            message: "Usuario Creado Correctamente",
            data: nuevoUsuario,
            linkValidacion: url
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