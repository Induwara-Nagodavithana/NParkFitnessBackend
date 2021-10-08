const BodyDetails = require("../model/bodyDetails.model");
const User = require("../model/user.model");

//Register a BodyDetails | guest
const createBodyDetails = async (req, res) => {
    if (req.body) {
        console.log("Create bodyDetails");
        BodyDetails.create(req.body)
            .then((bodyDetails) => {
                res.send({
                    'success': 'true',
                    'message': bodyDetails
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


//update BodyDetails Details
const updateBodyDetails = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        BodyDetails.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((bodyDetails) => {
                res.status(200).send({
                    'success': bodyDetails[0] == 1 ? 'true' : 'false',
                    'message': bodyDetails[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All BodyDetails
const getAllBodyDetails = (req, res) => {
    console.log("get All");
    BodyDetails.findAll().then((bodyDetails) => {
        res.send({
            'success': 'true',
            'message': bodyDetails
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get BodyDetails By Id
const getBodyDetailsById = (req, res) => {
    console.log("get All");
    BodyDetails.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    }).then((bodyDetails) => {
        res.send({
            'success': 'true',
            'message': bodyDetails
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete BodyDetails
const deleteBodyDetails = async (req, res) => {
    console.log("Delete bodyDetails");
    BodyDetails.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((bodyDetails) => {
            console.log(bodyDetails)
            res.status(200).send({
                'success': bodyDetails == 1 ? 'true' : 'false',
                'message': bodyDetails == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createBodyDetails,
    updateBodyDetails,
    deleteBodyDetails,
    getAllBodyDetails,
    getBodyDetailsById
}