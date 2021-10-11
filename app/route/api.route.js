const express = require('express');
var app = express();
const ApiRouter = express.Router();
const User = require('./user.api');
const Gym = require('./gym.route');
const Branch = require('./branch.route');
const ServiceType = require('./serviceType.route');
const BodyDetails = require('./bodyDetails.route');
const Membership = require('./membership.route');
const AttendItem = require('./attendItem.route');
const Attendance = require('./attendance.route');
const Payment = require('./payment.route');
const Request = require('./request.route');
const Schedule = require('./schedule.route');
const ScheduleItem = require('./scheduleItem.route');
const SubscriptionType = require('./subscriptionType.route');
const Subscription = require('./subscription.route');


// module.exports = function (){
//     app.use("/user", User());
//     app.use("/gym", Gym());
//     app.use("/branch", Branch());
//     app.use("/serviceType", ServiceType());
//     app.use("/bodyDetails", BodyDetails());
//     app.use("/membership", Membership());
//     app.use("/attendItem", AttendItem());
//     app.use("/attendance", Attendance());
//     app.use("/payment", Payment());
//     app.use("/request", Request());
//     app.use("/schedule", Schedule());
//     app.use("/scheduleItem", ScheduleItem());
//     app.use("/subscriptionType", SubscriptionType());
//     app.use("/subscription", Subscription());
//     return app;
// }

ApiRouter.use("/user", User);

module.exports = ApiRouter;