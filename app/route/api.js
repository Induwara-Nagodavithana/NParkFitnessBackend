const express = require('express');
var app = express();
const User = require('./user.route');
const Gym = require('./gym.route');


module.exports = function (){
    app.use("/user", User());
    app.use("/gym", Gym());
    // router.use("/user", User());
    // router.put('/update', EmployeeController.updateEmployee);
    // router.post('/validate', EmployeeController.validateEmployee);
    // router.delete('/delete',EmployeeController.deleteEmployee);
    return app;
}