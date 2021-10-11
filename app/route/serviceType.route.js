const express = require('express');
const ServiceTypeRouter = express.Router();
const ServiceTypeController = require('../controller/serviceType.controller');


ServiceTypeRouter.get('/', ServiceTypeController.getAllServiceType);
ServiceTypeRouter.post('/', ServiceTypeController.createServiceType);
ServiceTypeRouter.get('/:id', ServiceTypeController.getServiceTypeById);
ServiceTypeRouter.put('/:id', ServiceTypeController.updateServiceType);
ServiceTypeRouter.delete('/:id', ServiceTypeController.deleteServiceType);
module.exports = ServiceTypeRouter;
