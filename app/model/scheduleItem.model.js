const Sequelize = require("sequelize");

const db = require("../config/database");

var ScheduleItem = db.define(
    "scheduleItem",
    {
        noOfSet: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        noOfRepetition: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        time: {
            type: Sequelize.STRING,
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