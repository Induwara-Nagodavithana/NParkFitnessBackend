const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/payment.controller');

module.exports = function (){
    router.get('/', PaymentController.getAllPayment);
    router.post('/', PaymentController.createPayment);
    router.post('/getPaymentById', PaymentController.getPaymentById);
    router.put('/', PaymentController.updatePayment);
    router.delete('/',PaymentController.deletePayment);
    return router;
}