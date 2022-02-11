const Schedule = require("../model/schedule.model");
const User = require("../model/user.model");
const Membership = require("../model/membership.model");

//Register a Schedule | guest
exports.createSchedule = async (req, res) => {
    if (req.body) {
        console.log("Create schedule");
        Schedule.create(req.body)
            .then((schedule) => {
                res.send({
                    'success': 'true',
                    'data': schedule
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Schedule',
                    'description': err.message
                });
            });
    }
}


//update Schedule Details
exports.updateSchedule = async (req, res) => {
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
                    'data': schedule[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update Schedule',
                    'description': err.message
                });
            });
    }
}


//get All Schedule
exports.getAllSchedule = (req, res) => {
    console.log("get All");
    Schedule.findAll().then((schedule) => {
        res.send({
            'success': 'true',
            'data': schedule
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All Schedule',
                'description': err.message
            });
        });
}

//get Schedule By Id
exports.getScheduleById = (req, res) => {
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
            'data': schedule
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Schedule By ID',
                'description': err.message
            });
        });
}

//delete Schedule
exports.deleteSchedule = async (req, res) => {
    console.log("Delete schedule");
    Schedule.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((schedule) => {
            console.log(schedule)
            res.status(200).send({
                'success': schedule == 1 ? 'true' : 'false',
                'data': schedule == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete Schedule',
                'description': err.message
            });
        });
}
