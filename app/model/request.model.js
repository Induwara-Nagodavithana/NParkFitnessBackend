const Sequelize = require("sequelize");

const db = require("../config/database");

var Request = db.define(
    "request",
    {
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        target: {
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


module.exports = Request ;