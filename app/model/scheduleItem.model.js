const Sequelize = require("sequelize");

const db = require("../config/database");

var ScheduleItem = db.define(
    "scheduleItem",
    {
        noOfSet: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        noOfRepetition: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        timeByMinutes: {
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


module.exports = ScheduleItem ;