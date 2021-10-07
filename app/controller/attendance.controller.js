const Attendance = require("../model/attendance.model");
const Membership = require("../model/membership.model");

//Register a Attendance | guest
const createAttendance = async (req, res) => {
    if (req.body) {
        console.log("Create attendance");
        Attendance.create(req.body)
            .then((attendance) => {
                res.send({
                    'success': 'true',
                    'message': attendance
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


//update Attendance Details
const updateAttendance = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        Attendance.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((attendance) => {
                res.status(200).send({
                    'success': attendance[0] == 1 ? 'true' : 'false',
                    'message': attendance[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Attendance
const getAllAttendance = (req, res) => {
    console.log("get All");
    Attendance.findAll().then((attendance) => {
        res.send({
            'success': 'true',
            'message': attendance
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get Attendance By Id
const getAttendanceById = (req, res) => {
    console.log("get All");
    Attendance.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: Membership
        }
    }).then((attendance) => {
        res.send({
            'success': 'true',
            'message': attendance
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete Attendance
const deleteAttendance = async (req, res) => {
    console.log("Delete attendance");
    Attendance.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((attendance) => {
            console.log(attendance)
            res.status(200).send({
                'success': attendance == 1 ? 'true' : 'false',
                'message': attendance == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendance,
    getAttendanceById
}