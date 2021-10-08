const Gym = require("../model/gym.model");
const User = require("../model/user.model");

//Register a Gym | guest
const createGym = async (req, res) => {
    if (req.body) {
        console.log("Create gym");
        Gym.create(req.body)
            .then((gym) => {
                res.send({
                    'success': 'true',
                    'message': gym
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


//update Gym Details
const updateGym = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Gym.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((gym) => {
                res.status(200).send({
                    'success': gym[0] == 1 ? 'true' : 'false',
                    'message': gym[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Gym
const getAllGym = (req, res) => {
    console.log("get All");
    Gym.findAll().then((gym) => {
        res.send({
            'success': 'true',
            'message': gym
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Gym By Id
const getGymById = (req, res) => {
    console.log("get All");
    Gym.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    }).then((gym) => {
        res.send({
            'success': 'true',
            'message': gym
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Gym
const deleteGym = async (req, res) => {
    console.log("Delete gym");
    Gym.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((gym) => {
            console.log(gym)
            res.status(200).send({
                'success': gym == 1 ? 'true' : 'false',
                'message': gym == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createGym,
    updateGym,
    deleteGym,
    getAllGym,
    getGymById
}