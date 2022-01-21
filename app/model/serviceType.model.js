const Sequelize = require("sequelize");

const db = require("../config/database");

var ServiceType = db.define(
    "service",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        calorieForOne: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        }
    },
    {
        timestamps: true,
        createdAt: "CreatedAt",
        updatedAt: "UpdatedAt",
        freezeTableName: true,
    }
);


module.exports = ServiceType ;