const Schedule = require("../model/schedule.model");
const User = require("../model/user.model");
const Membership = require("../model/membership.model");

//Register a Schedule | guest
const createSchedule = async (req, res) => {
    if (req.body) {
        console.log("Create schedule");
        Schedule.create(req.body)
            .then((schedule) => {
                res.send({
                    'success': 'true',
                    'message': schedule
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


//update Schedule Details
const updateSchedule = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Schedule.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((schedule) => {
                res.status(200).send({
                    'success': schedule[0] == 1 ? 'true' : 'false',
                    'message': schedule[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Schedule
const getAllSchedule = (req, res) => {
    console.log("get All");
    Schedule.findAll().then((schedule) => {
        res.send({
            'success': 'true',
            'message': schedule
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Schedule By Id
const getScheduleById = (req, res) => {
    console.log("get All");
    Schedule.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            as: 'trainer'
        }, {
            model: Membership
        }]
    }).then((schedule) => {
        res.send({
            'success': 'true',
            'message': schedule
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Schedule
const deleteSchedule = async (req, res) => {
    console.log("Delete schedule");
    Schedule.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((schedule) => {
            console.log(schedule)
            res.status(200).send({
                'success': schedule == 1 ? 'true' : 'false',
                'message': schedule == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getAllSchedule,
    getScheduleById
}