const express = require('express');
var app = express();
const User = require('./user.api');
const Gym = require('./gym.api');
const Branch = require('./branch.api');
const ServiceType = require('./serviceType.api');
const BodyDetails = require('./bodyDetails.api');
const Membership = require('./membership.api');
const AttendItem = require('./attendItem.api');
const Attendance = require('./attendance.api');
const Payment = require('./payment.api');
const Request = require('./request.api');
const Schedule = require('./schedule.api');
const ScheduleItem = require('./scheduleItem.api');


module.exports = function (){
    app.use("/user", User());
    app.use("/gym", Gym());
    app.use("/branch", Branch());
    app.use("/serviceType", ServiceType());
    app.use("/bodyDetails", BodyDetails());
    app.use("/membership", Membership());
    app.use("/attendItem", AttendItem());
    app.use("/attendance", Attendance());
    app.use("/payment", Payment());
    app.use("/request", Request());
    app.use("/schedule", Schedule());
    app.use("/scheduleItem", ScheduleItem());
    return app;
}