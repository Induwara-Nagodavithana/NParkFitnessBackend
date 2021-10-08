const express = require('express');
const router = express.Router();
const SubscriptionTypeController = require('../controller/subscriptionType.controller');

module.exports = function (){
    router.get('/', SubscriptionTypeController.getAllSubscriptionType);
    router.post('/', SubscriptionTypeController.createSubscriptionType);
    router.get('/:id', SubscriptionTypeController.getSubscriptionTypeById);
    router.put('/:id', SubscriptionTypeController.updateSubscriptionType);
    router.delete('/',SubscriptionTypeController.deleteSubscriptionType);
    return router;
}