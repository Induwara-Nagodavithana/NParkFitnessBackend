const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/schedule.controller');

module.exports = function (){
    router.get('/', ScheduleController.getAllSchedule);
    router.post('/', ScheduleController.createSchedule);
    router.post('/getScheduleById', ScheduleController.getScheduleById);
    router.put('/', ScheduleController.updateSchedule);
    router.delete('/',ScheduleController.deleteSchedule);
    return router;
}