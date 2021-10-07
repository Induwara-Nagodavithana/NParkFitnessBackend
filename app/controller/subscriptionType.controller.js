const SubscriptionType = require("../model/subscriptionType.model");

//Register a SubscriptionType | guest
const createSubscriptionType = async (req, res) => {
    if (req.body) {
        console.log("Create subscriptionType");
        SubscriptionType.create(req.body)
            .then((subscriptionType) => {
                res.send({
                    'success': 'true',
                    'message': subscriptionType
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


//update SubscriptionType Details
const updateSubscriptionType = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        SubscriptionType.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((subscriptionType) => {
                res.status(200).send({
                    'success': subscriptionType[0] == 1 ? 'true' : 'false',
                    'message': subscriptionType[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All SubscriptionType
const getAllSubscriptionType = (req, res) => {
    console.log("get All");
    SubscriptionType.findAll().then((subscriptionType) => {
        res.send({
            'success': 'true',
            'message': subscriptionType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get SubscriptionType By Id
const getSubscriptionTypeById = (req, res) => {
    console.log("get All");
    SubscriptionType.findOne({
        where: {
            id: req.body.id
        }
    }).then((subscriptionType) => {
        res.send({
            'success': 'true',
            'message': subscriptionType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete SubscriptionType
const deleteSubscriptionType = async (req, res) => {
    console.log("Delete subscriptionType");
    SubscriptionType.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((subscriptionType) => {
            console.log(subscriptionType)
            res.status(200).send({
                'success': subscriptionType == 1 ? 'true' : 'false',
                'message': subscriptionType == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createSubscriptionType,
    updateSubscriptionType,
    deleteSubscriptionType,
    getAllSubscriptionType,
    getSubscriptionTypeById
}