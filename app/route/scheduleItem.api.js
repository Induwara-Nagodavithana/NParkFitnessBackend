const express = require('express');
const router = express.Router();
const ScheduleItemController = require('../controller/scheduleItem.controller');

module.exports = function (){
    router.get('/', ScheduleItemController.getAllScheduleItem);
    router.post('/', ScheduleItemController.createScheduleItem);
    router.get('/:id', ScheduleItemController.getScheduleItemById);
    router.put('/:id', ScheduleItemController.updateScheduleItem);
    router.delete('/',ScheduleItemController.deleteScheduleItem);
    return router;
}