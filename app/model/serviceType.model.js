const Sequelize = require("sequelize");

const db = require("../config/database");

var ServiceType = db.define(
    "serviceType",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        calorieForOne: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
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