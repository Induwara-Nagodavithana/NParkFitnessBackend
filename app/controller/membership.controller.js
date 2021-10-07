const Membership = require("../model/membership.model");
const User = require("../model/user.model");

//Register a Membership | guest
const createMembership = async (req, res) => {
    if (req.body) {
        console.log("Create membership");
        Membership.create(req.body)
            .then((membership) => {
                res.send({
                    'success': 'true',
                    'message': membership
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


//update Membership Details
const updateMembership = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        Membership.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((membership) => {
                res.status(200).send({
                    'success': membership[0] == 1 ? 'true' : 'false',
                    'message': membership[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Membership
const getAllMembership = (req, res) => {
    console.log("get All");
    Membership.findAll().then((membership) => {
        res.send({
            'success': 'true',
            'message': membership
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Membership By Id
const getMembershipById = (req, res) => {
    console.log("get All");
    Membership.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: User
        }
    }).then((membership) => {
        res.send({
            'success': 'true',
            'message': membership
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Membership
const deleteMembership = async (req, res) => {
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
                'message': membership == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createMembership,
    updateMembership,
    deleteMembership,
    getAllMembership,
    getMembershipById
}