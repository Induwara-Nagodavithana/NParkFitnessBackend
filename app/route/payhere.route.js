const express = require('express');
const PaymentController = require('../controller/payment.controller');
const PayHereRouter = express.Router();


// AuthRouter.get('/', UserController.getAllUser);
// AuthRouter.post('/', UserController.createUser);
// AuthRouter.put('/:id', UserController.updateUser);
PayHereRouter.post('/notify', PaymentController.notifyPayment);

module.exports = PayHereRouter;