const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const Branch = require("../model/branch.model");
const saltRounds = 5;

//Register a User | guest
exports.createUser = async (req, res) => {
    if (req.body) {
        console.log("Create user");
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                req.body.password = hash;
                User.create(req.body)
                    .then((user) => {
                        res.send({
                            'success': 'true',
                            'message': user
                        });
                    })
                    .catch((err) => {
                        res.status(400).send({
                            'success': 'false',
                            'message': err
                        });
                    });
            });
        });

    }
}

//login Validate
exports.validateUser = async (req, res) => {
    User.findOne({
        where: { email: req.body.email },
    }).then((user) => {
        if (!user) {
            console.log("User Not Found");
            return res.status(400).send({
                'success': 'false',
                'message': "User Not Found"
            });
        }
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            // result == true
            console.log(result);
            if (result) {
                console.log(user);
                res.send({
                    'success': 'true',
                    'message': user
                });
            } else {
                console.log("Credentials Does Not Matched");
                res.status(400).send({
                    'success': 'false',
                    'message': "Credentials Does Not Matched"
                });
            }
        });


    });
}

//update User Details
exports.updateUser = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        if (req.body.password != null) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    req.body.password = hash;
                    updateDetails(id, req, (err, user) => {
                        if (err) return res.status(400).send({
                            'success': 'false',
                            'message': err
                        });
                        console.log("user");
                        console.log(user);
                        res.status(200).send({
                            'success': user[0] == 1 ? 'true' : 'false',
                            'message': user[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                        });
                    })

                });
            });
        } else {
            updateDetails(id, req, (err, user) => {
                if (err) return res.status(400).send({
                    'success': 'false',
                    'message': err
                });
                console.log("user");
                console.log(user);
                res.status(200).send({
                    'success': user[0] == 1 ? 'true' : 'false',
                    'message': user[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
        }
        console.log(req.body);


    }
}

function updateDetails(id, req, callback) {
    User.update(req.body, {
        where: {
            id: id,
        },
    })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        });
}

//get All User
exports.getAllUser = (req, res) => {
    console.log("get All");
    User.findAll({
        include: {
            model: Branch
        }
    }).then((user) => {
        res.send({
            'success': 'true',
            'message': user
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete User
exports.deleteUser = async (req, res) => {
    console.log("Delete user");
    User.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((user) => {
            console.log(user)
            res.status(200).send({
                'success': user == 1 ? 'true' : 'false',
                'message': user == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}
