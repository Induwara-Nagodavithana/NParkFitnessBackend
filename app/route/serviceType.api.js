const express = require('express');
const router = express.Router();
const ServiceTypeController = require('../controller/serviceType.controller');

module.exports = function (){
    router.get('/', ServiceTypeController.getAllServiceType);
    router.post('/', ServiceTypeController.createServiceType);
    router.get('/:id', ServiceTypeController.getServiceTypeById);
    router.put('/:id', ServiceTypeController.updateServiceType);
    router.delete('/',ServiceTypeController.deleteServiceType);
    return router;
}