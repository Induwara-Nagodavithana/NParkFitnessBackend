const express = require('express');
const UserController = require('../controller/user.controller');
const AuthRouter = express.Router();


// AuthRouter.get('/', UserController.getAllUser);
// AuthRouter.post('/', UserController.createUser);
// AuthRouter.put('/:id', UserController.updateUser);
AuthRouter.post('/validate', UserController.validateUser);

module.exports = AuthRouter;