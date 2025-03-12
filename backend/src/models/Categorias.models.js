import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Categoria = sequelize.define("Categoria", {
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
    tableName: "categoria",
    timestamps: false,
});

