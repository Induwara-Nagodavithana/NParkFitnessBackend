const ServiceType = require("../model/serviceType.model");
const Branch = require("../model/branch.model");

//Register a ServiceType | guest
const createServiceType = async (req, res) => {
    if (req.body) {
        console.log("Create serviceType");
        ServiceType.create(req.body)
            .then((serviceType) => {
                res.send({
                    'success': 'true',
                    'data': serviceType
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create ServiceType',
                    'description': err
                });
            });
    }
}


//update ServiceType Details
const updateServiceType = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        ServiceType.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((serviceType) => {
                res.status(200).send({
                    'success': serviceType[0] == 1 ? 'true' : 'false',
                    'data': serviceType[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update ServiceType',
                    'description': err
                });
            });
    }
}


//get All ServiceType
const getAllServiceType = (req, res) => {
    console.log("get All");
    ServiceType.findAll().then((serviceType) => {
        res.send({
            'success': 'true',
            'data': serviceType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All ServiceType',
                'description': err
            });
        });
}

//get ServiceType By Id
const getServiceTypeById = (req, res) => {
    console.log("get All");
    ServiceType.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Branch
        }
    }).then((serviceType) => {
        res.send({
            'success': 'true',
            'data': serviceType
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting ServiceType By ID',
                'description': err
            });
        });
}

//delete ServiceType
const deleteServiceType = async (req, res) => {
    console.log("Delete serviceType");
    ServiceType.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((serviceType) => {
            console.log(serviceType)
            res.status(200).send({
                'success': serviceType == 1 ? 'true' : 'false',
                'data': serviceType == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete ServiceType',
                'description': err
            });
        });
}

module.exports = {
    createServiceType,
    updateServiceType,
    deleteServiceType,
    getAllServiceType,
    getServiceTypeById
}