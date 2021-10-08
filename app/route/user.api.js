const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

module.exports = function (){
    router.get('/', UserController.getAllUser);
    router.post('/', UserController.createUser);
    router.put('/:id', UserController.updateUser);
    router.post('/validate', UserController.validateUser);
    router.delete('/',UserController.deleteUser);
    return router;
}