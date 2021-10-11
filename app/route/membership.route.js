const express = require('express');
const MembershipRouter = express.Router();
const MembershipController = require('../controller/membership.controller');


MembershipRouter.get('/', MembershipController.getAllMembership);
MembershipRouter.post('/', MembershipController.createMembership);
MembershipRouter.get('/:id', MembershipController.getMembershipById);
MembershipRouter.put('/:id', MembershipController.updateMembership);
MembershipRouter.delete('/:id', MembershipController.deleteMembership);
module.exports = MembershipRouter;
