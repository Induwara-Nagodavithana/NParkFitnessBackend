const express = require('express');
const router = express.Router();
const SubscriptionTypeController = require('../controller/subscriptionType.controller');

module.exports = function (){
    router.get('/', SubscriptionTypeController.getAllSubscriptionType);
    router.post('/', SubscriptionTypeController.createSubscriptionType);
    router.post('/getSubscriptionTypeById', SubscriptionTypeController.getSubscriptionTypeById);
    router.put('/', SubscriptionTypeController.updateSubscriptionType);
    router.delete('/',SubscriptionTypeController.deleteSubscriptionType);
    return router;
}