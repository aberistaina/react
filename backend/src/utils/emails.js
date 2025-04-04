import nodemailer from "nodemailer";
import { crearTemplateHtml } from "./templateEmail.js";

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

export const crearMailOptions = (email, asunto, token, username) =>{

    let asuntoCorreo

    if(asunto === "registro"){
        asuntoCorreo = "Bienvenido a nuestro sitio web, por favor debes validar tu cuenta"
    }else if(asunto === "nuevaValidacion"){
        asuntoCorreo = "Email de validación"
    }else if(asunto === "recuperarPassword"){
        asuntoCorreo = "Recuperar Contraseña"
    }else{
        asuntoCorreo = "Modificación de Contraseña"
    }


    const mailOptions = {
            from: "Curso React", // Dirección del remitente
            to: `${email}`, // Dirección del destinatario
            subject: asuntoCorreo, // Asunto del correo
            html: crearTemplateHtml(email, asunto, token, username ), // Cuerpo del correo en HTML (opcional)
        };

    return mailOptions
}


export const enviarCorreo = (email, asunto, token , username ) =>{
    
    const mailOptions = crearMailOptions(email, asunto, token, username)
    
    // Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error al enviar el correo:", error);
    } else {
        console.log("Correo enviado:", info.response);
    }
});
}

