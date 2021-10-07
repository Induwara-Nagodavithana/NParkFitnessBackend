const Sequelize = require("sequelize");

const db = require("../config/database");

var Request = db.define(
    "request",
    {
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        heightTarget: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        weightTarget: {
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


module.exports = Request ;