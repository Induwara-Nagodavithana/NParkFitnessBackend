const express = require('express');
const MembershipRouter = express.Router();
const MembershipController = require('../controller/membership.controller');


MembershipRouter.get('/', MembershipController.getAllMembership);
MembershipRouter.post('/', MembershipController.createMembership);
MembershipRouter.get('/:id', MembershipController.getMembershipById);
MembershipRouter.get('/getNeededTrainers/:neededTrainer', MembershipController.getMembershipByNeededTrainer);
MembershipRouter.get('/getMembershipWithDetails/:id', MembershipController.getMembershipWithDetails);
MembershipRouter.get('/getAllMembershipByUserId/:id', MembershipController.getAllMembershipByUserId);
MembershipRouter.put('/:id', MembershipController.updateMembership);
MembershipRouter.delete('/:id', MembershipController.deleteMembership);
module.exports = MembershipRouter;
