const express = require('express');
const router = express.Router();
const AttendItemController = require('../controller/attendItem.controller');

module.exports = function (){
    router.get('/', AttendItemController.getAllAttendItem);
    router.post('/', AttendItemController.createAttendItem);
    router.get('/:id', AttendItemController.getAttendItemById);
    router.put('/:id', AttendItemController.updateAttendItem);
    router.delete('/',AttendItemController.deleteAttendItem);
    return router;
}