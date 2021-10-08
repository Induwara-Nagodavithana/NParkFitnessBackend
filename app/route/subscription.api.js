const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controller/subscription.controller');

module.exports = function (){
    router.get('/', SubscriptionController.getAllSubscription);
    router.post('/', SubscriptionController.createSubscription);
    router.get('/:id', SubscriptionController.getSubscriptionById);
    router.put('/:id', SubscriptionController.updateSubscription);
    router.delete('/',SubscriptionController.deleteSubscription);
    return router;
}