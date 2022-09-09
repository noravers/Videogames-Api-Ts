import { DataType, DataTypes, Sequelize } from "sequelize";


export const Genres = (sequelize: Sequelize) =>

    sequelize.define("genres", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
        {
            timestamps: false
        }
    );

