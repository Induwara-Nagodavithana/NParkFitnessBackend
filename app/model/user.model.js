const Sequelize = require("sequelize");

const db = require("../config/database");

const Attendance = require("./attendance.model")
const BodyDetails = require("./bodyDetails.model")
const Branch = require("./branch.model")
const Gym = require("./gym.model")
const Membership = require("./membership.model")
const Payment = require("./payment.model")
const Goal = require("./goal.model")
const Schedule = require("./schedule.model")
const ScheduleItem = require("./scheduleItem.model")
const ServiceType = require("./serviceType.model")
const Subscription = require("./subscription.model")
const SubscriptionType = require("./subscriptionType.model")
const AttendItem = require("./attendItem.model");
const MembershipType = require("./membershipType.model");
const DietPlan = require("./dietPlan.model");
const MealItem = require("./mealItem.model");

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
        birthDay: {
            type: Sequelize.STRING,
            allowNull: false,
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
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // address: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        // },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lane: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        province: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        fireUID: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        height: {
            type: Sequelize.DECIMAL(10, 2),
        },
        branchId: {
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


// Branch.hasMany(User,{constraints: false , allowNull: true, defaultValue: null })
// User.belongsTo(Branch,{constraints: false})

Branch.hasMany(Membership)
Membership.belongsTo(Branch)

Branch.hasMany(MembershipType)
MembershipType.belongsTo(Branch)


User.hasOne(Subscription)
Subscription.belongsTo(User)
SubscriptionType.hasMany(Subscription)
Subscription.belongsTo(SubscriptionType)
Branch.hasMany(ServiceType)
ServiceType.belongsTo(Branch)
/////
User.hasMany(BodyDetails)
BodyDetails.belongsTo(User)
User.hasMany(Membership)
Membership.belongsTo(User)
// Client.hasMany(BodyDetails)
// BodyDetails.belongsTo(Client)
// Client.hasMany(Membership)
// Membership.belongsTo(Client)
Membership.hasMany(Goal)
Goal.belongsTo(Membership)
Membership.hasMany(Payment)
Payment.belongsTo(Membership)
Membership.hasMany(Attendance)
Attendance.belongsTo(Membership)
Membership.hasMany(Schedule)
Schedule.belongsTo(Membership)
User.hasMany(Schedule,{as: 'trainer' ,foreignKey: 'trainerId'})
Schedule.belongsTo(User,{as: 'trainer' ,foreignKey: 'trainerId'})
Schedule.hasMany(ScheduleItem)
ScheduleItem.belongsTo(Schedule)
/////////
// Attendance.hasMany(ScheduleItem)
Attendance.hasMany(AttendItem)
AttendItem.belongsTo(Attendance)
ScheduleItem.hasMany(AttendItem)
AttendItem.belongsTo(ScheduleItem)
// ScheduleItem.belongsToMany(Attendance, { through: AttendItem })
//////////
ServiceType.hasMany(ScheduleItem)
ScheduleItem.belongsTo(ServiceType)
MembershipType.hasMany(Membership)
Membership.belongsTo(MembershipType)

DietPlan.hasMany(MealItem)
MealItem.belongsTo(DietPlan)
User.hasMany(DietPlan)
DietPlan.belongsTo(User)

User.hasMany(Membership,{as: 'trainId' ,foreignKey: 'trainerId', allowNull: true, defaultValue: null})
Membership.belongsTo(User,{as: 'trainId' ,foreignKey: 'trainerId', allowNull: true, defaultValue: null})

Branch.hasMany(Attendance)
Attendance.belongsTo(Branch)


module.exports = User;