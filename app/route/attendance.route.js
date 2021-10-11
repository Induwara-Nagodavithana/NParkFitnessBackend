const express = require('express');
const router = express.Router();
const AttendanceController = require('../controller/attendance.controller');

module.exports = function (){
    router.get('/', AttendanceController.getAllAttendance);
    router.post('/', AttendanceController.createAttendance);
    router.get('/:id', AttendanceController.getAttendanceById);
    router.put('/:id', AttendanceController.updateAttendance);
    router.delete('/',AttendanceController.deleteAttendance);
    return router;
}