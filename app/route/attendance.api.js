const express = require('express');
const router = express.Router();
const AttendanceController = require('../controller/attendance.controller');

module.exports = function (){
    router.get('/', AttendanceController.getAllAttendance);
    router.post('/', AttendanceController.createAttendance);
    router.post('/getAttendanceById', AttendanceController.getAttendanceById);
    router.put('/', AttendanceController.updateAttendance);
    router.delete('/',AttendanceController.deleteAttendance);
    return router;
}