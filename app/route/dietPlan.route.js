const express = require('express');
const DietPlanRouter = express.Router();
const DietPlanController = require('../controller/dietPlan.controller');


DietPlanRouter.get('/', DietPlanController.getAllDietPlan);
DietPlanRouter.post('/', DietPlanController.createDietPlan);
DietPlanRouter.get('/:id', DietPlanController.getDietPlanById);
DietPlanRouter.put('/:id', DietPlanController.updateDietPlan);
DietPlanRouter.delete('/:id', DietPlanController.deleteDietPlan);
module.exports = DietPlanRouter;
