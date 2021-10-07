const express = require('express');
const router = express.Router();
const AttendItemController = require('../controller/attendItem.controller');

module.exports = function (){
    router.get('/', AttendItemController.getAllAttendItem);
    router.post('/', AttendItemController.createAttendItem);
    router.post('/getAttendItemById', AttendItemController.getAttendItemById);
    router.put('/', AttendItemController.updateAttendItem);
    router.delete('/',AttendItemController.deleteAttendItem);
    return router;
}