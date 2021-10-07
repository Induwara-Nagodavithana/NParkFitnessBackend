const express = require('express');
const router = express.Router();
const BodyDetailsController = require('../controller/bodyDetails.controller');

module.exports = function (){
    router.get('/', BodyDetailsController.getAllBodyDetails);
    router.post('/', BodyDetailsController.createBodyDetails);
    router.post('/getBodyDetailsById', BodyDetailsController.getBodyDetailsById);
    router.put('/', BodyDetailsController.updateBodyDetails);
    router.delete('/',BodyDetailsController.deleteBodyDetails);
    return router;
}