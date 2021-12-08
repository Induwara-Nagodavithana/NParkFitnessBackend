const Branch = require("../model/branch.model");
const Gym = require("../model/gym.model");
const MembershipType = require("../model/membershipType.model");
const User = require("../model/user.model");

//Register a MembershipType | guest
exports.createMembershipType = async (req, res) => {
    if (req.body) {
        console.log("Create membershipType");
        MembershipType.create(req.body)
            .then((membershipType) => {
                res.send({
                    'success': 'true',
                    'data': membershipType
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create MembershipType',
                    'description': err
                });
            });
    }
}


//update MembershipType Details
exports.updateMembershipType = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        MembershipType.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((membershipType) => {
                res.status(200).send({
                    'success': membershipType[0] == 1 ? 'true' : 'false',
                    'data': membershipType[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update MembershipType',
                    'description': err
                });
            });
    }
}


//get All MembershipType
exports.getAllMembershipType = (req, res) => {
    console.log("get All");
    MembershipType.findAll().then((membershipType) => {
        res.send({
            'success': 'true',
            'data': membershipType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All MembershipType',
                'description': err
            });
        });
}

//get MembershipType By Id
exports.getMembershipTypeById = (req, res) => {
    console.log("get All");
    MembershipType.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    }).then((membershipType) => {
        res.send({
            'success': 'true',
            'data': membershipType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting MembershipType By ID',
                'description': err
            });
        });
}


//delete MembershipType
exports.deleteMembershipType = async (req, res) => {
    console.log("Delete membershipType");
    MembershipType.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((membershipType) => {
            console.log(membershipType)
            res.status(200).send({
                'success': membershipType == 1 ? 'true' : 'false',
                'data': membershipType == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete MembershipType',
                'description': err
            });
        });
}
