const express = require('express');
var app = express();
const User = require('./user.api');
const Gym = require('./gym.api');
const Branch = require('./branch.api');
const ServiceType = require('./serviceType.api');
const BodyDetails = require('./bodyDetails.api');
const Membership = require('./membership.api');


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