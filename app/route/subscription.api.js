const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controller/subscription.controller');

module.exports = function (){
    router.get('/', SubscriptionController.getAllSubscription);
    router.post('/', SubscriptionController.createSubscription);
    router.post('/getSubscriptionById', SubscriptionController.getSubscriptionById);
    router.put('/', SubscriptionController.updateSubscription);
    router.delete('/',SubscriptionController.deleteSubscription);
    return router;
}