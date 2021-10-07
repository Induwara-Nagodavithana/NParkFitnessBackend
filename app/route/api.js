const express = require('express');
var app = express();
const User = require('./user.route');
const Gym = require('./gym.route');
const Branch = require('./branch.route');
const ServiceType = require('./serviceType.route');
const BodyDetails = require('./bodyDetails.route');
const Membership = require('./membership.route');


module.exports = function (){
    app.use("/user", User());
    app.use("/gym", Gym());
    app.use("/branch", Branch());
    app.use("/serviceType", ServiceType());
    app.use("/bodyDetails", BodyDetails());
    app.use("/membership", Membership());
    // router.use("/user", User());
    // router.put('/update', EmployeeController.updateEmployee);
    // router.post('/validate', EmployeeController.validateEmployee);
    // router.delete('/delete',EmployeeController.deleteEmployee);
    return app;
}