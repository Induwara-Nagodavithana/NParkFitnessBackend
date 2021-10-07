const Sequelize = require("sequelize");

const db = require("../config/database");

var AttendItem = db.define(
    "attendItem",
    {
        isDone: {
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


module.exports = AttendItem ;