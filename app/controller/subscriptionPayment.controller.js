const Gym = require("../model/gym.model");
const SubscriptionPayment = require("../model/subscriptionPayment.model");
const Subscription = require("../model/subscription.model");
const SubscriptionType = require("../model/subscriptionType.model");
const User = require("../model/user.model");

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
