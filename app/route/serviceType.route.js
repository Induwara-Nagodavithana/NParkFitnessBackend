const express = require('express');
const router = express.Router();
const ServiceTypeController = require('../controller/serviceType.controller');

module.exports = function (){
    router.get('/', ServiceTypeController.getAllServiceType);
    router.post('/', ServiceTypeController.createServiceType);
    router.post('/getServiceTypeById', ServiceTypeController.getServiceTypeById);
    router.put('/', ServiceTypeController.updateServiceType);
    router.delete('/',ServiceTypeController.deleteServiceType);
    return router;
}