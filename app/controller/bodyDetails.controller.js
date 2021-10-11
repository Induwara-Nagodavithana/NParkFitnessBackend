const BodyDetails = require("../model/bodyDetails.model");
const User = require("../model/user.model");

//Register a BodyDetails | guest
exports.createBodyDetails = async (req, res) => {
    if (req.body) {
        console.log("Create bodyDetails");
        BodyDetails.create(req.body)
            .then((bodyDetails) => {
                res.send({
                    'success': 'true',
                    'data': bodyDetails
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Attendance',
                'description': err
                });
            });
    }
}


//update BodyDetails Details
exports.updateBodyDetails = async (req, res) => {
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
                    'data': bodyDetails[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update Attendance',
                'description': err
                });
            });
    }
}


//get All BodyDetails
exports.getAllBodyDetails = (req, res) => {
    console.log("get All");
    BodyDetails.findAll().then((bodyDetails) => {
        res.send({
            'success': 'true',
            'data': bodyDetails
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All BodyDetails',
                'description': err
            });
        });
}

//get BodyDetails By Id
exports.getBodyDetailsById = (req, res) => {
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
            'data': bodyDetails
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting BodyDetails By ID',
                'description': err
            });
        });
}

//delete BodyDetails
exports.deleteBodyDetails = async (req, res) => {
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
                'data': bodyDetails == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete BodyDetails',
                'description': err
            });
        });
}
