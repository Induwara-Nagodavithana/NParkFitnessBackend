const Attendance = require("../model/attendance.model");
const Membership = require("../model/membership.model");

//Register a Attendance | guest
exports.createAttendance = async (req, res) => {
    if (req.body) {
        console.log("Create attendance");
        Attendance.create(req.body)
            .then((attendance) => {
                res.send({
                    'success': 'true',
                    'data': attendance
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


//update Attendance Details
exports.updateAttendance = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        Attendance.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((attendance) => {
                res.status(200).send({
                    'success': attendance[0] == 1 ? 'true' : 'false',
                    'data': attendance[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All Attendance
exports.getAllAttendance = (req, res) => {
    console.log("get All");
    Attendance.findAll().then((attendance) => {
        res.send({
            'success': 'true',
            'data': attendance
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All Attendance',
                'description': err
            });
        });
}

//get Attendance By Id
exports.getAttendanceById = (req, res) => {
    console.log("get All");
    Attendance.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Membership
        }
    }).then((attendance) => {
        res.send({
            'success': 'true',
            'data': attendance
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Attendance By ID',
                'description': err
            });
        });
}

//delete Attendance
exports.deleteAttendance = async (req, res) => {
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
                'data': attendance == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete Attendance',
                'description': err
            });
        });
}
