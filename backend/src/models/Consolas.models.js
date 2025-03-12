import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Consola = sequelize.define("Consola", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: "consola",
    timestamps: false,
});

