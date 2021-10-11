const Membership = require("../model/membership.model");
const User = require("../model/user.model");

//Register a Membership | guest
exports.createMembership = async (req, res) => {
    if (req.body) {
        console.log("Create membership");
        Membership.create(req.body)
            .then((membership) => {
                res.send({
                    'success': 'true',
                    'data': membership
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Membership',
                    'description': err
                });
            });
    }
}


//update Membership Details
exports.updateMembership = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Membership.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((membership) => {
                res.status(200).send({
                    'success': membership[0] == 1 ? 'true' : 'false',
                    'data': membership[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update Membership',
                    'description': err
                });
            });
    }
}


//get All Membership
exports.getAllMembership = (req, res) => {
    console.log("get All");
    Membership.findAll().then((membership) => {
        res.send({
            'success': 'true',
            'data': membership
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All Membership',
                'description': err
            });
        });
}

//get Membership By Id
exports.getMembershipById = (req, res) => {
    console.log("get All");
    Membership.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    }).then((membership) => {
        res.send({
            'success': 'true',
            'data': membership
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Membership By ID',
                'description': err
            });
        });
}

//delete Membership
exports.deleteMembership = async (req, res) => {
    console.log("Delete membership");
    Membership.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((membership) => {
            console.log(membership)
            res.status(200).send({
                'success': membership == 1 ? 'true' : 'false',
                'data': membership == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete Membership',
                'description': err
            });
        });
}
