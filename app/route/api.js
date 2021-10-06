const express = require('express');
var app = express();
const User = require('./user.route');
const router = express.Router();
// const EmployeeController = require('../controller/employee.controller');
// app.use("/user", User);


module.exports = function (){
    app.use("/user", User());
    // router.use("/user", User());
    // router.put('/update', EmployeeController.updateEmployee);
    // router.post('/validate', EmployeeController.validateEmployee);
    // router.delete('/delete',EmployeeController.deleteEmployee);
    return app;
}