const express = require('express');
const ScheduleItemRouter = express.Router();
const ScheduleItemController = require('../controller/scheduleItem.controller');


ScheduleItemRouter.get('/', ScheduleItemController.getAllScheduleItem);
ScheduleItemRouter.post('/', ScheduleItemController.createScheduleItem);
ScheduleItemRouter.get('/:id', ScheduleItemController.getScheduleItemById);
ScheduleItemRouter.put('/:id', ScheduleItemController.updateScheduleItem);
ScheduleItemRouter.delete('/', ScheduleItemController.deleteScheduleItem);
module.exports = ScheduleItemRouter;
