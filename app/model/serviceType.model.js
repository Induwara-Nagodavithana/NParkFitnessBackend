const Sequelize = require("sequelize");

const db = require("../config/database");

var ServiceType = db.define(
    "serviceType",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        calorieForSet: {
            type: Sequelize.DECIMAL,
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