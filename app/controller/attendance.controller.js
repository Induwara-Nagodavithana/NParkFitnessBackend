const Attendance = require("../model/attendance.model");
const AttendItem = require("../model/attendItem.model");
const Membership = require("../model/membership.model");
const Schedule = require("../model/schedule.model");
const ScheduleItem = require("../model/scheduleItem.model");
const { Op } = require("sequelize");
const Branch = require("../model/branch.model");

//Register a Attendance | guest
exports.createAttendance = async (req, res) => {
    var attendItemArr = [];
    if (req.body) {
        console.log("Create attendance");
        Attendance.create(req.body)
            .then((attendance) => {
                Schedule.findOne({
                    where: {
                        membershipId: attendance.membershipId
                    }
                }).then((schedule) => {
                    if (schedule != null) {
                        ScheduleItem.findAll(
                            {
                                where: {
                                    scheduleId: schedule.id
                                }
                            }
                        ).then(async (scheduleItem) => {
                            const promises = scheduleItem.map(async element => {
                                attendItemArr.push({ donePercentage: 0, attendanceId: attendance.id, scheduleItemId: element.id })
                            });
                            console.log(attendItemArr);
                            await Promise.all(promises);
                            AttendItem.bulkCreate(attendItemArr)
                                .then((attendItem) => {

                                    //////////////////////
                                    res.send({
                                        'success': 'true',
                                        'data': attendance,
                                        'message': 'Create AttendItem Successful',
                                    });
                                    //////////////////////////
                                    // res.send({
                                    //     'success': 'true',
                                    //     'data': attendItem
                                    // });
                                })
                                .catch((err) => {
                                    res.status(400).send({
                                        'success': 'false',
                                        'message': 'Error in Create AttendItem',
                                        'description': err.name
                                    });
                                });

                        })
                            .catch((err) => {
                                res.status(400).send({
                                    'success': 'false',
                                    'message': 'Error in Getting All ScheduleItem',
                                    'description': err.name
                                });
                            });
                    } else {
                        res.send({
                            'success': 'true',
                            'data': attendance,
                            'message': 'Create AttendItem Failed',
                        });

                    }


                })
                    .catch((err) => {
                        res.status(400).send({
                            'success': 'false',
                            'message': 'Error in Getting Schedule By ID',
                            'description': err.name
                        });
                    });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create Attendance',
                    'description': err.name
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
                    'description': err.name
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
                'description': err.name
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
                'description': err.name
            });
        });
}

//get Attendance By MemberId And Date
exports.getAttendanceByMemberIdAndDate = (req, res) => {
    console.log("get Attendance By MemberId And Date");
    Attendance.findOne({
        where: {
            membershipId: req.body.membershipId,
            date: req.body.date
        },
        include: {
            model: Branch
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
                'description': err.name
            });
        });
}

//get Attendance By UserId
exports.getAllAttendanceByUserId = (req, res) => {
    console.log("get All By UserId");
    var memberId = [];

    Membership.findAll({
        where: {
            userId: req.params.id
        },
    }).then(async (membership) => {

        await membership.map(element => {
            memberId.push({ membershipId: element.id })
        })
        console.log(memberId);

        Attendance.findAll({
            where: {
                [Op.or]: memberId
            },
            include: {
                model: Branch
            },
            order: [['date', 'DESC']],
        }).then((attendance) => {
            res.send({
                'success': 'true',
                'data': { 'attendance': attendance }
            });
        })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Getting Attendance By ID',
                    'description': err.name
                });
            });

    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting Membership By userId',
                'description': err.name
            });
        });


    
}

//delete Attendance
exports.deleteAttendance = async (req, res) => {
    console.log("Delete attendance");
    Attendance.destroy({
        where: {
            id: req.params.id
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
                'description': err.name
            });
        });
}
