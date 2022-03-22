const Gym = require("../model/gym.model");
const SubscriptionPayment = require("../model/subscriptionPayment.model");
const Subscription = require("../model/subscription.model");
const SubscriptionType = require("../model/subscriptionType.model");
const User = require("../model/user.model");
const { Op } = require("sequelize");
var md5 = require("md5");

//Register a SubscriptionPayment | guest
exports.createSubscriptionPayment = async (req, res) => {
  if (req.body) {
    console.log("Create subscriptionPayment");
    SubscriptionPayment.create(req.body)
      .then((subscriptionPayment) => {
        res.send({
          success: "true",
          data: subscriptionPayment,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Create SubscriptionPayment",
          description: err.message,
        });
      });
  }
};

//update SubscriptionPayment Details
exports.updateSubscriptionPayment = async (req, res) => {
  if (req.body) {
    if (!req.params.id) return res.status(500).send("Id is missing");
    let id = req.params.id;
    SubscriptionPayment.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((subscriptionPayment) => {
        res.status(200).send({
          success: subscriptionPayment[0] == 1 ? "true" : "false",
          data:
            subscriptionPayment[0] == 1
              ? "Updated Successfully"
              : "Update Not Successful",
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Update SubscriptionPayment",
          description: err.message,
        });
      });
  }
};

//get All SubscriptionPayment
exports.getAllSubscriptionPayment = (req, res) => {
  console.log("get All");
  SubscriptionPayment.findAll()
    .then((subscriptionPayment) => {
      res.send({
        success: "true",
        data: subscriptionPayment,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting All SubscriptionPayment",
        description: err.message,
      });
    });
};

//get SubscriptionPayment By Id
exports.getSubscriptionPaymentById = (req, res) => {
  console.log("get All");
  SubscriptionPayment.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Subscription,
        include: {
          model: SubscriptionType,
        },
      },
    ],
  })
    .then((subscriptionPayment) => {
      res.send({
        success: "true",
        data: subscriptionPayment,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting SubscriptionPayment By ID",
        description: err.message,
      });
    });
};

//get SubscriptionPayment By UserId
exports.getSubscriptionPaymentByUserId = (req, res) => {
  console.log("get All");

  var subscriptionIdArr = [];

  Subscription.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then(async (user) => {
      await user.map((element) => {
        subscriptionIdArr.push({ subscriptionId: element.id });
      });
      console.log(subscriptionIdArr);

      SubscriptionPayment.findAll({
        where: {
          [Op.or]: subscriptionIdArr,
        },
        include: [
          {
            model: Subscription,
            include: {
              model: SubscriptionType,
              model: User,
            },
          },
        ],
        order: [["date", "DESC"]],
      })
        .then((payment) => {
          res.send({
            success: "true",
            data: { payment: payment },
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: "false",
            message: "Error in Getting Subscription Payment By ID",
            description: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting Subscription By userId",
        description: err.message,
      });
    });
};

//listen to payHere notification
exports.notifyPayment = (req, res) => {
  console.log("notify Payhere Payment");
  console.log(req.body);
  console.log(`Payhere Notify ${JSON.stringify(req.body)}`);

  var merchant_id = req.body.merchant_id;
  var order_id = req.body.order_id;
  var payhere_amount = req.body.payhere_amount;
  var payhere_currency = req.body.payhere_currency;
  var status_code = req.body.status_code;
  var md5sig = req.body.md5sig;
  if (req.body.custom_1 == null || req.body.custom_1 == "") {
    console.log("payment failed1");
    return res.sendStatus(404);
  }
  var custom_1 = JSON.parse(req.body.custom_1);
  var merchant_secret = "49WUiSiKwSJ49Y1t6KwI414q7ylFFVse28RmB4FEIIvn"; // Replace with your Merchant Secret (Can be found on your PayHere account's Settings page)
  var local_md5sig = md5(
    merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      md5(merchant_secret).toUpperCase()
  ).toUpperCase();
  switch (status_code) {
    case 2:
      console.log("payment success");
      break;
    case 0:
      console.log("payment pending");
      break;
    case -1:
      console.log("payment cancel");
      break;
    case -2:
      console.log("payment failed");
      break;
    case -3:
      console.log("payment charged back");
      break;

    default:
      console.log("payment known");
      break;
  }
  if (local_md5sig === md5sig || status_code == 2) {
    console.log(`Payment Details ${JSON.stringify(custom_1)}`);
    Subscription.findOne({
      where: {
        userId: req.body.custom_1,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((subscription) => {
        console.log("Create subscriptionPayment");
        console.log(subscription);
        var body = {
          date: new Date().toISOString().slice(0, 10),
          amount: payhere_amount,
          subscriptionId: subscription.id,
        };
        SubscriptionPayment.create(body)
          .then((subscriptionPayment) => {
            console.log(subscriptionPayment);
            var dt = new Date();
            dt.setMonth(dt.getMonth() + 1);
            var updateBody = {
              expireDate: dt.toISOString().slice(0, 10),
            };
            Subscription.update(updateBody, {
              where: {
                id: subscription.id,
              },
            })
              .then((subscription) => {
                res.status(200).send({
                  success: subscription[0] == 1 ? "true" : "false",
                  data:
                    subscription[0] == 1
                      ? "Updated Successfully"
                      : "Update Not Successful",
                });
              })
              .catch((err) => {
                res.status(400).send({
                  success: "false",
                  message: "Error in Update Subscription",
                  description: err.message,
                });
              });
          })
          .catch((err) => {
            console.log("payment failed2");

            res.status(400).send({
              success: "false",
              message: "Error in Create SubscriptionPayment",
              description: err.message,
            });
          });
      })
      .catch((err) => {
        console.log("payment failed3");

        res.status(400).send({
          success: "false",
          message: "Error in Getting Subscription By UserID",
          description: err.message,
        });
      });
  } else {
    console.log("payment failed4");
    res.sendStatus(403);
  }
};

//get All Gym Owners with SubscriptionPayment
// exports.getAllGymOwnersWithSubscriptionPayment = (req, res) => {
//   console.log("get All 2354");
//   User.findAll({
//     where: {
//       type: "Owner",
//     },
//     include: [
//       {
//         model: Subscription,
//         include: {
//           model: SubscriptionType,
//         },
//       },
//     ],
//   })
//     .then((user) => {
//       res.send({
//         success: "true",
//         data: user,
//       });
//     })
//     .catch((err) => {
//       res.status(400).send({
//         success: "false",
//         message: "Error in Getting All User",
//         description: err.message,
//       });
//     });
// };

//delete SubscriptionPayment
exports.deleteSubscriptionPayment = async (req, res) => {
  console.log("Delete subscriptionPayment");
  SubscriptionPayment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((subscriptionPayment) => {
      console.log(subscriptionPayment);
      res.status(200).send({
        success: subscriptionPayment == 1 ? "true" : "false",
        data:
          subscriptionPayment == 1
            ? "Deleted Successfully"
            : "Delete Not Successful",
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Delete SubscriptionPayment",
        description: err.message,
      });
    });
};
