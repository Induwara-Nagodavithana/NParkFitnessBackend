const express = require('express');
const BodyDetailsRouter = express.Router();
const BodyDetailsController = require('../controller/bodyDetails.controller');


BodyDetailsRouter.get('/', BodyDetailsController.getAllBodyDetails);
BodyDetailsRouter.post('/', BodyDetailsController.createBodyDetails);
BodyDetailsRouter.get('/:id', BodyDetailsController.getBodyDetailsById);
BodyDetailsRouter.put('/:id', BodyDetailsController.updateBodyDetails);
BodyDetailsRouter.delete('/', BodyDetailsController.deleteBodyDetails);
module.exports = BodyDetailsRouter;
