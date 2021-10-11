const express = require('express');
const RequestRouter = express.Router();
const RequestController = require('../controller/request.controller');


RequestRouter.get('/', RequestController.getAllRequest);
RequestRouter.post('/', RequestController.createRequest);
RequestRouter.get('/:id', RequestController.getRequestById);
RequestRouter.put('/:id', RequestController.updateRequest);
RequestRouter.delete('/', RequestController.deleteRequest);
module.exports = RequestRouter;
