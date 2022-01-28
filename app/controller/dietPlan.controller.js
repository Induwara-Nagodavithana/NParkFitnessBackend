const DietPlan = require("../model/dietPlan.model");
const MealItem = require("../model/mealItem.model");
const User = require("../model/user.model");

//Register a DietPlan | guest
exports.createDietPlan = async (req, res) => {
    if (req.body) {
        console.log("Create dietPlan");
        DietPlan.create(req.body)
            .then((dietPlan) => {
                res.send({
                    'success': 'true',
                    'data': dietPlan
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create DietPlan',
                    'description': err
                });
            });
    }
}


//update DietPlan Details
exports.updateDietPlan = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        DietPlan.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((dietPlan) => {
                res.status(200).send({
                    'success': dietPlan[0] == 1 ? 'true' : 'false',
                    'data': dietPlan[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update DietPlan',
                    'description': err
                });
            });
    }
}


//get All DietPlan
exports.getAllDietPlan = (req, res) => {
    console.log("get All");
    DietPlan.findAll().then((dietPlan) => {
        res.send({
            'success': 'true',
            'data': dietPlan
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All DietPlan',
                'description': err
            });
        });
}

//get DietPlan By Id
exports.getDietPlanById = (req, res) => {
    console.log("get All");
    DietPlan.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    }).then((dietPlan) => {
        res.send({
            'success': 'true',
            'data': dietPlan
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting DietPlan By ID',
                'description': err
            });
        });
}

//get DietPlans and MealItems By userId
exports.getDietPlanAndMealByUserId = (req, res) => {
    console.log("get DietPlans and MealItems By userId");
    DietPlan.findAll({
        where: {
            userId: req.params.id
        }
    }).then(async (dietPlan) => {
        var dietData = [];
        const promises = dietPlan.map(async element => {
            await MealItem.findAll({
                where: {
                    dietPlanId: element.id
                },
                include: {
                    model: DietPlan
                }
            }).then(async (mealItem) => {
                var totCalAmount = 0;
                await mealItem.map(element => {
                    totCalAmount += element.calAmount
                });
                var data = {
                    'totalCalorie': totCalAmount,
                    'dietPlanData': element,
                    'mealItemData': mealItem,
                }
                console.log(data)

                dietData.push(data);
            })
                .catch((err) => {
                    res.status(400).send({
                        'success': 'false',
                        'message': 'Error in Getting MealItem By ID',
                        'description': err
                    });
                });
        });
        await Promise.all(promises);
        // var allData = {
        //     'data': dietData
        // }
        console.log('Done')

        res.send({
            'success': 'true',
            'data': dietData
        });

    })
        .catch((err) => {
            console.log(err)
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting DietPlan By ID',
                'description': err
            });
        });
}

//delete DietPlan
exports.deleteDietPlan = async (req, res) => {
    console.log("Delete dietPlan");
    DietPlan.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((dietPlan) => {
            console.log(dietPlan)
            res.status(200).send({
                'success': dietPlan == 1 ? 'true' : 'false',
                'data': dietPlan == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete DietPlan',
                'description': err
            });
        });
}
