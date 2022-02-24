const Payment = require("../model/payment.model");
const Membership = require("../model/membership.model");
const Branch = require("../model/branch.model");
const Gym = require("../model/gym.model");
const User = require("../model/user.model");
const { Op } = require("sequelize");
const MembershipType = require("../model/membershipType.model");

//Register a Payment | guest
exports.createPayment = async (req, res) => {
  if (req.body) {
    console.log("Create payment");
    Payment.create(req.body)
      .then((payment) => {
        res.send({
          success: "true",
          data: payment,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Create Payment",
          description: err.message.name,
        });
      });
  }
};

//update Payment Details
exports.updatePayment = async (req, res) => {
  if (req.body) {
    if (!req.params.id) return res.status(500).send("Id is missing");
    let id = req.params.id;
    Payment.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((payment) => {
        res.status(200).send({
          success: payment[0] == 1 ? "true" : "false",
          data:
            payment[0] == 1 ? "Updated Successfully" : "Update Not Successful",
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: "false",
          message: "Error in Update Payment",
          description: err.message,
        });
      });
  }
};

//get All Payment
exports.getAllPayment = (req, res) => {
  console.log("get All");
  Payment.findAll()
    .then((payment) => {
      res.send({
        success: "true",
        data: payment,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting All Payment",
        description: err.message,
      });
    });
};

//get All Payment By userId
exports.getAllPaymentByUserId = (req, res) => {
  console.log("get All Payment By userId");
  var memberId = [];

  Membership.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then(async (membership) => {
      await membership.map((element) => {
        memberId.push({ membershipId: element.id });
      });
      console.log(memberId);

      Payment.findAll({
        where: {
          [Op.or]: memberId,
        },
        include: {
          model: Membership,
          include: {
            model: Branch,
            include: {
              model: Gym,
            },
          },
        },
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
            message: "Error in Getting All Payment",
            description: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting Membership By userId",
        description: err.message,
      });
    });
};

//get All Payment By memberId
exports.getAllPaymentByMemberId = (req, res) => {
  console.log("get All Payment By MemberId");
  var memberId = [];

  Membership.findOne({
    where: {
      id: req.params.id,
    },

    include: [
      {
        model: User,
      },
      {
        model: User,
        as: "trainId",
      },
      {
        model: MembershipType,
      },
      {
        model: Branch,
        include: {
          model: Gym,
        },
      },
    ],
  })
    .then(async (membership) => {
      console.log(membership);

      Payment.findAll({
        where: {
          membershipId: req.params.id,
        },
        order: [["date", "DESC"]],
      })
        .then((payment) => {
          res.send({
            success: "true",
            data: { member: membership, payment: payment },
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: "false",
            message: "Error in Getting All Payment",
            description: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting Membership By userId",
        description: err.message,
      });
    });
};

//listen to payHere notification
exports.notifyPayment = (req, res) => {
  console.log("notify Payhere Payment");
  console.log(req.body);
  res.send({
    success: "true",
  });
};

//get All Payment By membershipId
exports.getAllPaymentByMembershipId = (req, res) => {
  console.log("get All Payment By membershipId");
  Payment.findAll({
    where: {
      membershipId: req.params.id,
    },
    include: {
      model: Membership,
      include: {
        model: Branch,
        include: {
          model: Gym,
        },
      },
    },
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
        message: "Error in Getting All Payment",
        description: err.message,
      });
    });
};

//get Payment By Id
exports.getPaymentById = (req, res) => {
  console.log("get All");
  Payment.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Membership,
    },
  })
    .then((payment) => {
      res.send({
        success: "true",
        data: payment,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Getting Payment By ID",
        description: err.message,
      });
    });
};

//delete Payment
exports.deletePayment = async (req, res) => {
  console.log("Delete payment");
  Payment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((payment) => {
      console.log(payment);
      res.status(200).send({
        success: payment == 1 ? "true" : "false",
        data: payment == 1 ? "Deleted Successfully" : "Delete Not Successful",
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: "false",
        message: "Error in Delete Payment",
        description: err.message,
      });
    });
};
