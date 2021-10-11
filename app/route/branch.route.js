const express = require('express');
const BranchRouter = express.Router();
const BranchController = require('../controller/branch.controller');


BranchRouter.get('/', BranchController.getAllBranch);
BranchRouter.post('/', BranchController.createBranch);
BranchRouter.get('/:id', BranchController.getBranchById);
BranchRouter.put('/:id', BranchController.updateBranch);
BranchRouter.delete('/', BranchController.deleteBranch);
module.exports = BranchRouter;
