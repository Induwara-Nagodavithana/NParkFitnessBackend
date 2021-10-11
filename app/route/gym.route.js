const express = require('express');
const router = express.Router();
const GymController = require('../controller/gym.controller');

module.exports = function (){
    router.get('/', GymController.getAllGym);
    router.post('/', GymController.createGym);
    router.get('/:id', GymController.getGymById);
    router.put('/:id', GymController.updateGym);
    router.delete('/',GymController.deleteGym);
    return router;
}