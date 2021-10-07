const express = require('express');
var app = express();
const User = require('./user.route');
const Gym = require('./gym.route');
const Branch = require('./branch.route');
const ServiceType = require('./serviceType.route');


module.exports = function (){
    app.use("/user", User());
    app.use("/gym", Gym());
    app.use("/branch", Branch());
    app.use("/serviceType", ServiceType());
    // router.use("/user", User());
    // router.put('/update', EmployeeController.updateEmployee);
    // router.post('/validate', EmployeeController.validateEmployee);
    // router.delete('/delete',EmployeeController.deleteEmployee);
    return app;
}