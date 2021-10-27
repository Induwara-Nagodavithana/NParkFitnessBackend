const express = require('express');
const { upload, getFileStream } = require('../config/aws-s3');
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
UserRouter.delete('/:id', UserController.deleteUser);
UserRouter.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(req.file)

    res.send('Successfully uploaded ' + req.file.key + ' files!')
})
UserRouter.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

module.exports = UserRouter;