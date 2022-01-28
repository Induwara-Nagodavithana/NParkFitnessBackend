const express = require('express');
const PaymentRouter = express.Router();
const PaymentController = require('../controller/payment.controller');


PaymentRouter.get('/', PaymentController.getAllPayment);
PaymentRouter.post('/', PaymentController.createPayment);
PaymentRouter.get('/:id', PaymentController.getPaymentById);
PaymentRouter.get('/getAllPaymentByMembershipId/:id', PaymentController.getAllPaymentByMembershipId);
PaymentRouter.get('/getAllPaymentByUserId/:id', PaymentController.getAllPaymentByUserId);
PaymentRouter.put('/:id', PaymentController.updatePayment);
PaymentRouter.delete('/:id', PaymentController.deletePayment);
module.exports = PaymentRouter;
