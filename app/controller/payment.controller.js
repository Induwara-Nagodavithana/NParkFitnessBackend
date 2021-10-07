const Payment = require("../model/payment.model");
const Membership = require("../model/membership.model");

//Register a Payment | guest
const createPayment = async (req, res) => {
    if (req.body) {
        console.log("Create payment");
        Payment.create(req.body)
            .then((payment) => {
                res.send({
                    'success': 'true',
                    'message': payment
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': err
                });
            });
    }
}


//update Payment Details
const updatePayment = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        Payment.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((payment) => {
                res.status(200).send({
                    'success': payment[0] == 1 ? 'true' : 'false',
                    'message': payment[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': err
                });
            });
    }
}


//get All Payment
const getAllPayment = (req, res) => {
    console.log("get All");
    Payment.findAll().then((payment) => {
        res.send({
            'success': 'true',
            'message': payment
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Payment By Id
const getPaymentById = (req, res) => {
    console.log("get All");
    Payment.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: Membership
        }
    }).then((payment) => {
        res.send({
            'success': 'true',
            'message': payment
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Payment
const deletePayment = async (req, res) => {
    console.log("Delete payment");
    Payment.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((payment) => {
            console.log(payment)
            res.status(200).send({
                'success': payment == 1 ? 'true' : 'false',
                'message': payment == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

module.exports = {
    createPayment,
    updatePayment,
    deletePayment,
    getAllPayment,
    getPaymentById
}