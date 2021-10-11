const express = require('express');
const UserController = require('../controller/user.controller');
const UserRouter = express.Router();

// module.exports = function (){
//     router.get('/', UserController.getAllUser);
//     router.post('/', UserController.createUser);
//     router.put('/:id', UserController.updateUser);
//     router.post('/validate', UserController.validateUser);
//     router.delete('/',UserController.deleteUser);
//     return router;
// }

UserRouter.get('/', UserController.getAllUser);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.post('/validate', UserController.validateUser);
UserRouter.delete('/',UserController.deleteUser);

module.exports = UserRouter;