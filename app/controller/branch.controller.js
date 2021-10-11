const Branch = require("../model/branch.model");
const Gym = require("../model/gym.model");

//Register a Branch | guest
exports.createBranch = async (req, res) => {
    if (req.body) {
        console.log("Create branch");
        Branch.create(req.body)
            .then((branch) => {
                res.send({
                    'success': 'true',
                    'data': branch
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Branch',
                    'description': err
                });
            });
    }
}


//update Branch Details
exports.updateBranch = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Branch.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((branch) => {
                res.status(200).send({
                    'success': branch[0] == 1 ? 'true' : 'false',
                    'data': branch[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update Branch',
                    'description': err
                });
            });
    }
}


//get All Branch
exports.getAllBranch = (req, res) => {
    console.log("get All");
    Branch.findAll().then((branch) => {
        res.send({
            'success': 'true',
            'data': branch
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All Branch',
                'description': err
            });
        });
}

//get Branch By Id
exports.getBranchById = (req, res) => {
    console.log("get All");
    Branch.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Gym
        }
    }).then((branch) => {
        res.send({
            'success': 'true',
            'data': branch
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Branch By ID',
                'description': err
            });
        });
}

//delete Branch
exports.deleteBranch = async (req, res) => {
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
                'data': branch == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete Branch',
                'description': err
            });
        });
}
