const Subscription = require("../model/subscription.model");
const SubscriptionType = require("../model/subscriptionType.model");
const User = require("../model/user.model");

//Register a Subscription | guest
const createSubscription = async (req, res) => {
    if (req.body) {
        console.log("Create subscription");
        Subscription.create(req.body)
            .then((subscription) => {
                res.send({
                    'success': 'true',
                    'message': subscription
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


//update Subscription Details
const updateSubscription = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        Subscription.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((subscription) => {
                res.status(200).send({
                    'success': subscription[0] == 1 ? 'true' : 'false',
                    'message': subscription[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Subscription
const getAllSubscription = (req, res) => {
    console.log("get All");
    Subscription.findAll().then((subscription) => {
        res.send({
            'success': 'true',
            'message': subscription
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Subscription By Id
const getSubscriptionById = (req, res) => {
    console.log("get All");
    Subscription.findOne({
        where: {
            id: req.body.id
        },
        include: [{
            model: User
        },
        {
            model: SubscriptionType
        }]
    }).then((subscription) => {
        res.send({
            'success': 'true',
            'message': subscription
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Subscription
const deleteSubscription = async (req, res) => {
    console.log("Delete subscription");
    Subscription.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((subscription) => {
            console.log(subscription)
            res.status(200).send({
                'success': subscription == 1 ? 'true' : 'false',
                'message': subscription == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getAllSubscription,
    getSubscriptionById
}