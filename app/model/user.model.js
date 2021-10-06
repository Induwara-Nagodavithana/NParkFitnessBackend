const Sequelize = require("sequelize");

const db = require("../config/database");

const Attendance = require("./attendance.model")
const BodyDetails = require("./bodyDetails.model")
const Branch = require("./branch.model")
const Client = require("./client.model")
const Gym = require("./gym.model")
const Membership = require("./membership.model")
const Payment = require("./payment.model")
const Request = require("./request.model")
const Schedule = require("./schedule.model")
const ScheduleItem = require("./scheduleItem.model")
const ServiceType = require("./serviceType.model")
const Subscription = require("./subscription.model")
const AttendItem = require("./attendItem.model")

var User = db.define(
    "user",
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nic: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        contactNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            // allowNull: false,
        }
    },
    {
        timestamps: true,
        createdAt: "CreatedAt",
        updatedAt: "UpdatedAt",
        freezeTableName: true,
    }
);

User.hasMany(Gym)
Gym.belongsTo(User)
Gym.hasMany(Branch)
Branch.belongsTo(Gym)
// Branch.hasMany(User, { as: 'branchId', allowNull: true, defaultValue: null })
// User.hasOne(Branch,{as: 'branchId', allowNull: true, defaultValue: null })
Branch.hasMany(User,{constraints: false , allowNull: true, defaultValue: null })
// User.hasOne(Branch)
User.belongsTo(Branch,{constraints: false})
User.hasMany(Subscription)
Subscription.belongsTo(User)
Branch.hasMany(ServiceType)
ServiceType.belongsTo(Branch)
Client.hasMany(BodyDetails)
BodyDetails.belongsTo(Client)
Client.hasMany(Membership)
Membership.belongsTo(Client)
Membership.hasMany(Request)
Request.belongsTo(Membership)
Membership.hasMany(Payment)
Payment.belongsTo(Membership)
Membership.hasMany(Attendance)
Attendance.belongsTo(Membership)
User.hasMany(Schedule)
Schedule.belongsTo(User)
Schedule.hasMany(ScheduleItem)
ScheduleItem.belongsTo(Schedule)
/////////
Attendance.hasMany(AttendItem)
AttendItem.belongsTo(Attendance)
ScheduleItem.hasMany(AttendItem)
AttendItem.belongsTo(ScheduleItem)
//////////
ServiceType.hasMany(ScheduleItem)
ScheduleItem.belongsTo(ServiceType)


module.exports = User;