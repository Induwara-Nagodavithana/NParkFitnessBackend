const Subscription = require("../model/subscription.model");
const SubscriptionType = require("../model/subscriptionType.model");
const User = require("../model/user.model");

//Register a Subscription | guest
exports.createSubscription = async (req, res) => {
    if (req.body) {
        console.log("Create subscription");
        Subscription.create(req.body)
            .then((subscription) => {
                res.send({
                    'success': 'true',
                    'data': subscription
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Subscription',
                    'description': err
                });
            });
    }
}


//update Subscription Details
exports.updateSubscription = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Subscription.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((subscription) => {
                res.status(200).send({
                    'success': subscription[0] == 1 ? 'true' : 'false',
                    'data': subscription[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update Subscription',
                    'description': err
                });
            });
    }
}


//get All Subscription
exports.getAllSubscription = (req, res) => {
    console.log("get All");
    Subscription.findAll().then((subscription) => {
        res.send({
            'success': 'true',
            'data': subscription
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All Subscription',
                'description': err
            });
        });
}

//get Subscription By Id
exports.getSubscriptionById = (req, res) => {
    console.log("get All");
    Subscription.findOne({
        where: {
            id: req.params.id
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
            'data': subscription
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Subscription By ID',
                'description': err
            });
        });
}

//delete Subscription
exports.deleteSubscription = async (req, res) => {
    console.log("Delete subscription");
    Subscription.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((subscription) => {
            console.log(subscription)
            res.status(200).send({
                'success': subscription == 1 ? 'true' : 'false',
                'data': subscription == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete Subscription',
                'description': err
            });
        });
}
