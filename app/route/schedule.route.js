const express = require('express');
const ScheduleRouter = express.Router();
const ScheduleController = require('../controller/schedule.controller');


    ScheduleRouter.get('/', ScheduleController.getAllSchedule);
    ScheduleRouter.post('/', ScheduleController.createSchedule);
    ScheduleRouter.get('/:id', ScheduleController.getScheduleById);
    ScheduleRouter.post('/getScheduleCountByTrainerIdAndMonth/:id', ScheduleController.getScheduleCountByTrainerIdAndMonth);
    ScheduleRouter.put('/:id', ScheduleController.updateSchedule);
    ScheduleRouter.delete('/:id',ScheduleController.deleteSchedule);
    module.exports = ScheduleRouter;
