const DietPlan = require("../model/dietPlan.model");
const MealItem = require("../model/mealItem.model");
const Membership = require("../model/membership.model");
const User = require("../model/user.model");

//Register a DietPlan | guest
exports.createDietPlan = async (req, res) => {
  if (req.body) {
    console.log("Create dietPlan");
    DietPlan.create(req.body)
      .then((dietPlan) => {
        res.send({
          success: "true",
          data: dietPlan,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Create DietPlan",
          description: err.message,
        });
      });
  }
};

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
          success: dietPlan[0] == 1 ? "true" : "false",
          data:
            dietPlan[0] == 1 ? "Updated Successfully" : "Update Not Successful",
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Update DietPlan",
          description: err.message,
        });
      });
  }
};

//get All DietPlan
exports.getAllDietPlan = (req, res) => {
  console.log("get All");
  DietPlan.findAll()
    .then((dietPlan) => {
      res.send({
        success: "true",
        data: dietPlan,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting All DietPlan",
        description: err.message,
      });
    });
};

//get DietPlan By Id
exports.getDietPlanById = (req, res) => {
  console.log("get All");
  DietPlan.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
    },
  })
    .then((dietPlan) => {
      res.send({
        success: "true",
        data: dietPlan,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting DietPlan By ID",
        description: err.message,
      });
    });
};

//get DietPlans and MealItems By MemberId
exports.getDietPlanAndMealByMemberId = (req, res) => {
  console.log("get DietPlans and MealItems By MemberId");
  Membership.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((membership) => {
      DietPlan.findAll({
        where: {
          userId: membership.userId,
        },
      })
        .then(async (dietPlan) => {
          var dietData = [];
          const promises = dietPlan.map(async (element) => {
            await MealItem.findAll({
              where: {
                dietPlanId: element.id,
              },
              include: {
                model: DietPlan,
              },
            })
              .then(async (mealItem) => {
                var totCalAmount = 0;
                await mealItem.map((element) => {
                  totCalAmount += element.calAmount;
                });
                var data = {
                  totalCalorie: totCalAmount,
                  dietPlanData: element,
                  mealItemData: mealItem,
                };
                console.log(data);

                dietData.push(data);
              })
              .catch((err) => {
                res.status(400).send({
                  success: "false",
                  message: "Error in Getting MealItem By ID",
                  description: err.message,
                });
              });
          });
          await Promise.all(promises);
          // var allData = {
          //     'data': dietData
          // }
          console.log("Done");

          res.send({
            success: "true",
            data: dietData,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({
            success: "false",
            message: "Error in Getting DietPlan By ID",
            description: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        success: "false",
        message: "Error in Getting DietPlan By ID",
        description: err.message,
      });
    });
};

//get DietPlans and MealItems By userId
exports.getDietPlanAndMealByUserId = (req, res) => {
  console.log("get DietPlans and MealItems By userId");
  DietPlan.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then(async (dietPlan) => {
      var dietData = [];
      const promises = dietPlan.map(async (element) => {
        await MealItem.findAll({
          where: {
            dietPlanId: element.id,
          },
          include: {
            model: DietPlan,
          },
        })
          .then(async (mealItem) => {
            var totCalAmount = 0;
            await mealItem.map((element) => {
              totCalAmount += element.calAmount;
            });
            var data = {
              totalCalorie: totCalAmount,
              dietPlanData: element,
              mealItemData: mealItem,
            };
            console.log(data);

            dietData.push(data);
          })
          .catch((err) => {
            res.status(400).send({
              success: "false",
              message: "Error in Getting MealItem By ID",
              description: err.message,
            });
          });
      });
      await Promise.all(promises);
      // var allData = {
      //     'data': dietData
      // }
      console.log("Done");

      res.send({
        success: "true",
        data: dietData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        success: "false",
        message: "Error in Getting DietPlan By ID",
        description: err.message,
      });
    });
};

//create or update new Diet and mealItem
exports.createDietAndMealItem = (req, res) => {
  console.log("get All");
  console.log(req.body);
  Membership.findOne({
    where: {
      id: req.body.memberId,
    },
  })
    .then((membership) => {
      console.log(membership);
      DietPlan.findOne({
        where: {
          userId: membership.userId,
          mealType: req.body.mealType,
        },
      })
        .then((dietPlan) => {
          if (dietPlan !== null) {
            MealItem.destroy({
              where: {
                dietPlanId: dietPlan.id,
              },
            })
              .then(async (mealItem) => {
                console.log(mealItem);
                const mealArr = [];
                const promises = req.body.mealData.map(async (element) => {
                  mealArr.push({
                    foodName: element.name,
                    foodType: "Eat",
                    amount: element.amount,
                    calAmount: element.calorie,
                    dietPlanId: dietPlan.id,
                  });
                });
                await Promise.all(promises);
                await MealItem.bulkCreate(mealArr);
                res.send({
                  success: "true",
                  data: mealArr,
                });
              })
              .catch((err) => {
                res.status(400).send({
                  success: "false",
                  message: "Error in Delete MealItem",
                  description: err.message,
                });
              });
          } else {
            console.log("Create dietPlan");
            DietPlan.create({
              mealType: req.body.mealType,
              userId: membership.userId,
            })
              .then(async (dietPlan) => {
                const mealArr = [];
                const promises = req.body.mealData.map(async (element) => {
                  mealArr.push({
                    foodName: element.name,
                    foodType: "Eat",
                    amount: element.amount,
                    calAmount: element.calorie,
                    dietPlanId: dietPlan.id,
                  });
                });
                await Promise.all(promises);
                await MealItem.bulkCreate(mealArr);
                res.send({
                  success: "true",
                  data: mealArr,
                });
              })
              .catch((err) => {
                res.status(400).send({
                  success: "false",
                  message: "Error in Create DietPlan",
                  description: err.message,
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({
            success: "false",
            message: "Error in Getting DietPlan By ID",
            description: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        success: "false",
        message: "Error in Getting All Membership",
        description: err.message,
      });
    });
};

//delete DietPlan
exports.deleteDietPlan = async (req, res) => {
  console.log("Delete dietPlan");
  DietPlan.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dietPlan) => {
      console.log(dietPlan);
      res.status(200).send({
        success: dietPlan == 1 ? "true" : "false",
        data: dietPlan == 1 ? "Deleted Successfully" : "Delete Not Successful",
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Delete DietPlan",
        description: err.message,
      });
    });
};
