const express = require('express');
const router = express.Router();
const BranchController = require('../controller/branch.controller');

module.exports = function (){
    router.get('/', BranchController.getAllBranch);
    router.post('/', BranchController.createBranch);
    router.get('/:id', BranchController.getBranchById);
    router.put('/:id', BranchController.updateBranch);
    router.delete('/',BranchController.deleteBranch);
    return router;
}