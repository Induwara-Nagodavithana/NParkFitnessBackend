const express = require('express');
const PaymentRouter = express.Router();
const PaymentController = require('../controller/payment.controller');


PaymentRouter.get('/', PaymentController.getAllPayment);
PaymentRouter.post('/', PaymentController.createPayment);
PaymentRouter.get('/:id', PaymentController.getPaymentById);
PaymentRouter.put('/:id', PaymentController.updatePayment);
PaymentRouter.delete('/', PaymentController.deletePayment);
module.exports = PaymentRouter;
