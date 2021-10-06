const Sequelize = require("sequelize");

const db = require("../config/database");

var Branch = db.define(
    "branch",
    {
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isTrue: {
            type: Sequelize.BOOLEAN,
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


module.exports = Branch ;