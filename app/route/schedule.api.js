const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/schedule.controller');

module.exports = function (){
    router.get('/', ScheduleController.getAllSchedule);
    router.post('/', ScheduleController.createSchedule);
    router.get('/:id', ScheduleController.getScheduleById);
    router.put('/:id', ScheduleController.updateSchedule);
    router.delete('/',ScheduleController.deleteSchedule);
    return router;
}