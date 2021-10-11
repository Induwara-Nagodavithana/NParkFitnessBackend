const express = require('express');
const AttendItemRouter = express.Router();
const AttendItemController = require('../controller/attendItem.controller');


AttendItemRouter.get('/', AttendItemController.getAllAttendItem);
AttendItemRouter.post('/', AttendItemController.createAttendItem);
AttendItemRouter.get('/:id', AttendItemController.getAttendItemById);
AttendItemRouter.put('/:id', AttendItemController.updateAttendItem);
AttendItemRouter.delete('/:id', AttendItemController.deleteAttendItem);
module.exports = AttendItemRouter;
