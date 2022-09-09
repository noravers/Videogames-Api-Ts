import { DataType, DataTypes, Sequelize } from "sequelize";


export const Videogame = (sequelize: Sequelize) =>

    sequelize.define("videogame",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,

            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'name',
                    msg: 'The videogames already exists'
                },
                validate: {
                    notEmpty: {
                        msg: 'The name is required'
                    }
                }
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description is required'
                    }
                }
            },
            released: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    is: {
                        args: /^([0-9])(\.[0-9])?$/,
                        msg: 'Rating must be a number or a decimal'
                    }
                }
            },
            platforms: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false

            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdInDb: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
        },
        {
            timestamps: false,
        })

