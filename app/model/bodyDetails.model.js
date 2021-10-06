const Sequelize = require("sequelize");

const db = require("../config/database");

var BodyDetails = db.define(
    "bodyDetails",
    {
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        weight: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        height: {
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


module.exports = BodyDetails ;