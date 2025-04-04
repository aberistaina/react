import Sequelize from "sequelize";
import dotenv from "dotenv"
dotenv.config();
import logger from '../utils/logger.js';

//Conexión a la Base de Datos

const database = process.env.DB_DATABASE
const usuario = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
export const sequelize = new Sequelize(database, usuario, password, {
    host: host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 3000,
    },
    logging: (msg) => logger.info(msg),
});
