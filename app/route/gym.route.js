const express = require('express');
const GymRouter = express.Router();
const GymController = require('../controller/gym.controller');


GymRouter.get('/', GymController.getAllGym);
GymRouter.post('/', GymController.createGym);
GymRouter.get('/:id', GymController.getGymById);
GymRouter.put('/:id', GymController.updateGym);
GymRouter.delete('/', GymController.deleteGym);
module.exports = GymRouter;
