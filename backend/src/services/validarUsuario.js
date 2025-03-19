import { Usuario } from "../models/Usuario.model.js";
import { isValidEmail, isValidRut, isValidName, isValidPassword } from "../utils/validators.js";

export const validateUser = ({rut, nombre, apellido, email, password}) =>{
    if(!isValidRut(rut)){
        throw new Error("El rut es inválido")
    }
    if(!isValidEmail(email)){
        throw new Error("El email no tiene un formato válido")
    }
    if(!isValidName(nombre)){
        throw new Error("el nombre no cumple el formato")
    }
    if(!isValidName(apellido)){
        throw new Error("el apelido no cumple el formato")
    }
    if(!isValidPassword(password)){
        throw new Error("La contraseña no cumple el formato válido")
    }
}

export const userExist = async(rut, email, telefono) =>{
    if(rut){
        const userRut = await Usuario.findOne({
            where: { rut }
        })
        if(userRut){
            throw new Error("El rut ingresado ya existe en la base de datos")
        }
    }

    if(email){
        const userEmail = await Usuario.findOne({
            where: { email }
        })
        if(userEmail){
            throw new Error("El Email ingresado ya existe en la base de datos")
        }
    }

    if(telefono){
        const userTelefono = await Usuario.findOne({
            where: { telefono }
        })
        if(userTelefono){
            throw new Error("El Teléfono ingresado ya existe en la base de datos")
        }
    }
}