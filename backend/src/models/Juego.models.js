import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Juego = sequelize.define("Juego", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_consola: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "juego",
    timestamps: false,
});

