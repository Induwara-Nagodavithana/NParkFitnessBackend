const Branch = require("../model/branch.model");
const Gym = require("../model/gym.model");

//Register a Branch | guest
const createBranch = async (req, res) => {
    if (req.body) {
        console.log("Create branch");
        Branch.create(req.body)
            .then((branch) => {
                res.send({
                    'success': 'true',
                    'message': branch
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


//update Branch Details
const updateBranch = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        Branch.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((branch) => {
                res.status(200).send({
                    'success': branch[0] == 1 ? 'true' : 'false',
                    'message': branch[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Branch
const getAllBranch = (req, res) => {
    console.log("get All");
    Branch.findAll().then((branch) => {
        res.send({
            'success': 'true',
            'message': branch
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Branch By Id
const getBranchById = (req, res) => {
    console.log("get All");
    Branch.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: Gym
        }
    }).then((branch) => {
        res.send({
            'success': 'true',
            'message': branch
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Branch
const deleteBranch = async (req, res) => {
    console.log("Delete branch");
    Branch.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((branch) => {
            console.log(branch)
            res.status(200).send({
                'success': branch == 1 ? 'true' : 'false',
                'message': branch == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createBranch,
    updateBranch,
    deleteBranch,
    getAllBranch,
    getBranchById
}