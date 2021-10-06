const express = require('express');
const router = express.Router();
const GymController = require('../controller/gym.controller');

module.exports = function (){
    router.get('/', GymController.getAllGym);
    router.post('/', GymController.createGym);
    router.post('/getGymById', GymController.getGymById);
    router.put('/', GymController.updateGym);
    router.delete('/',GymController.deleteGym);
    return router;
}