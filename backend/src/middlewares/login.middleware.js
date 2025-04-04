import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "../.env")});
import { Usuario } from "../models/Usuario.model.js";

let secret = process.env.SECRET

export const emitirToken = async(req, res, next) =>{
    try {
        const {email, password } = req.body

        const usuario = await Usuario.findOne({
            attributes: ["email", "id", "password", "admin", "validate"],
            where:{
                email
            }
        })

        if (!usuario){
            return res.json({code:400, message: "email o Password Incorrecto",})
        }

        let validacionPassword = await bcrypt.compare(password, usuario.password)

        
        if(!validacionPassword){
            return res.json({code:400, message: "email o Password Incorrecto",})
        }

        if(!usuario.toJSON().validate){
            return res.json({code:403, message: "Debes validar tu cuenta para iniciar sesión",})
        }

        const { password: _, ...usuarioSinPassword } = usuario.toJSON();

        let token = jwt.sign({
            data: usuarioSinPassword,
        },
        secret,
        {expiresIn : "30d"}
        )


        req.token = token
        req.usuario = usuarioSinPassword
        next()

    } catch (error) {
        console.log(error.message)
        res.status(500).json({code: 500, message: "Error en el proceso de autenticación"})
    } 

}

const verificacionToken = (token) =>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret,(error, decoded) =>{
            if(error){
                reject({
                    code: 401,
                    message: "El token proporcionado no fue emitido por el servidor, fue adulterado o está caducado"
                })
                
            }
            resolve(decoded)
        })
    })
}

export const verificarToken = async(req, res, next) =>{

    try {
        let {authorization} = req.headers
        let {token} = req.query
        let dataToken;

        if(authorization){
            console.log(authorization);
            let token = authorization.split(" ")[1]

            dataToken = await verificacionToken(token)
            
        }else if(token){
            dataToken = await verificacionToken(token)
        }else{
            return res.status(401).json({code:401, message: error})
        }

        req.player = dataToken.data
        next()
        
        
    } catch (error) {
        console.log(error)
        let code = 500
        let errorMessage = "Error el en proceso de autenticación"
        if(error.code){
            code = error.code
            errorMessage = error.message
        }
        res.status(code).json({code: code, message: errorMessage})
    }
}