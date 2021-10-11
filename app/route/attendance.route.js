const express = require('express');
const AttendanceRouter = express.Router();
const AttendanceController = require('../controller/attendance.controller');


AttendanceRouter.get('/', AttendanceController.getAllAttendance);
AttendanceRouter.post('/', AttendanceController.createAttendance);
AttendanceRouter.get('/:id', AttendanceController.getAttendanceById);
AttendanceRouter.put('/:id', AttendanceController.updateAttendance);
AttendanceRouter.delete('/:id', AttendanceController.deleteAttendance);
module.exports = AttendanceRouter;
