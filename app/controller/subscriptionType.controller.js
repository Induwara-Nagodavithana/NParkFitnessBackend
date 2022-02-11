const SubscriptionType = require("../model/subscriptionType.model");

//Register a SubscriptionType | guest
exports.createSubscriptionType = async (req, res) => {
    if (req.body) {
        console.log("Create subscriptionType");
        SubscriptionType.create(req.body)
            .then((subscriptionType) => {
                res.send({
                    'success': 'true',
                    'data': subscriptionType
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create SubscriptionType',
                    'description': err.message
                });
            });
    }
}


//update SubscriptionType Details
exports.updateSubscriptionType = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        SubscriptionType.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((subscriptionType) => {
                res.status(200).send({
                    'success': subscriptionType[0] == 1 ? 'true' : 'false',
                    'data': subscriptionType[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update SubscriptionType',
                    'description': err.message
                });
            });
    }
}


//get All SubscriptionType
exports.getAllSubscriptionType = (req, res) => {
    console.log("get All");
    SubscriptionType.findAll().then((subscriptionType) => {
        res.send({
            'success': 'true',
            'data': subscriptionType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All SubscriptionType',
                'description': err.message
            });
        });
}

//get SubscriptionType By Id
exports.getSubscriptionTypeById = (req, res) => {
    console.log("get All");
    SubscriptionType.findOne({
        where: {
            id: req.params.id
        }
    }).then((subscriptionType) => {
        res.send({
            'success': 'true',
            'data': subscriptionType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting SubscriptionType By ID',
                'description': err.message
            });
        });
}

//delete SubscriptionType
exports.deleteSubscriptionType = async (req, res) => {
    console.log("Delete subscriptionType");
    SubscriptionType.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((subscriptionType) => {
            console.log(subscriptionType)
            res.status(200).send({
                'success': subscriptionType == 1 ? 'true' : 'false',
                'data': subscriptionType == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete SubscriptionType',
                'description': err.message
            });
        });
}
