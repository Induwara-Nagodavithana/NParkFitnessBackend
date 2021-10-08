const express = require('express');
const router = express.Router();
const RequestController = require('../controller/request.controller');

module.exports = function (){
    router.get('/', RequestController.getAllRequest);
    router.post('/', RequestController.createRequest);
    router.get('/:id', RequestController.getRequestById);
    router.put('/:id', RequestController.updateRequest);
    router.delete('/',RequestController.deleteRequest);
    return router;
}