const express = require('express');
const MembershipTypeRouter = express.Router();
const MembershipTypeController = require('../controller/membershipType.controller');


MembershipTypeRouter.get('/', MembershipTypeController.getAllMembershipType);
MembershipTypeRouter.post('/', MembershipTypeController.createMembershipType);
MembershipTypeRouter.get('/:id', MembershipTypeController.getMembershipTypeById);
MembershipTypeRouter.put('/:id', MembershipTypeController.updateMembershipType);
MembershipTypeRouter.delete('/:id', MembershipTypeController.deleteMembershipType);
module.exports = MembershipTypeRouter;
