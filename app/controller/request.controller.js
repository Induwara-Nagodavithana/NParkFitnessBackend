const Request = require("../model/request.model");
const Membership = require("../model/membership.model");

//Register a Request | guest
const createRequest = async (req, res) => {
    if (req.body) {
        console.log("Create request");
        Request.create(req.body)
            .then((request) => {
                res.send({
                    'success': 'true',
                    'message': request
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


//update Request Details
const updateRequest = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Request.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((request) => {
                res.status(200).send({
                    'success': request[0] == 1 ? 'true' : 'false',
                    'message': request[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Request
const getAllRequest = (req, res) => {
    console.log("get All");
    Request.findAll().then((request) => {
        res.send({
            'success': 'true',
            'message': request
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Request By Id
const getRequestById = (req, res) => {
    console.log("get All");
    Request.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Membership
        }
    }).then((request) => {
        res.send({
            'success': 'true',
            'message': request
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Request
const deleteRequest = async (req, res) => {
    console.log("Delete request");
    Request.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((request) => {
            console.log(request)
            res.status(200).send({
                'success': request == 1 ? 'true' : 'false',
                'message': request == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createRequest,
    updateRequest,
    deleteRequest,
    getAllRequest,
    getRequestById
}