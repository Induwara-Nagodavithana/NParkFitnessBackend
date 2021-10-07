const express = require('express');
const router = express.Router();
const MembershipController = require('../controller/membership.controller');

module.exports = function (){
    router.get('/', MembershipController.getAllMembership);
    router.post('/', MembershipController.createMembership);
    router.post('/getMembershipById', MembershipController.getMembershipById);
    router.put('/', MembershipController.updateMembership);
    router.delete('/',MembershipController.deleteMembership);
    return router;
}