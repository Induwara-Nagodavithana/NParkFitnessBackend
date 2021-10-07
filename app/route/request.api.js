const express = require('express');
const router = express.Router();
const RequestController = require('../controller/request.controller');

module.exports = function (){
    router.get('/', RequestController.getAllRequest);
    router.post('/', RequestController.createRequest);
    router.post('/getRequestById', RequestController.getRequestById);
    router.put('/', RequestController.updateRequest);
    router.delete('/',RequestController.deleteRequest);
    return router;
}