const AttendItem = require("../model/attendItem.model");
const Attendance = require("../model/attendance.model");
const ScheduleItem = require("../model/scheduleItem.model");

//Register a AttendItem | guest
const createAttendItem = async (req, res) => {
    if (req.body) {
        console.log("Create attendItem");
        AttendItem.create(req.body)
            .then((attendItem) => {
                res.send({
                    'success': 'true',
                    'message': attendItem
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


//update AttendItem Details
const updateAttendItem = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
        AttendItem.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((attendItem) => {
                res.status(200).send({
                    'success': attendItem[0] == 1 ? 'true' : 'false',
                    'message': attendItem[0] == 1 ? "Updated Successfully" : "Update Not Successful"
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


//get All AttendItem
const getAllAttendItem = (req, res) => {
    console.log("get All");
    AttendItem.findAll().then((attendItem) => {
        res.send({
            'success': 'true',
            'message': attendItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//get AttendItem By Id
const getAttendItemById = (req, res) => {
    console.log("get All");
    AttendItem.findOne({
        where: {
            id: req.body.id
        },
        include: [{
            model: Attendance
        }, {
            model: ScheduleItem
        }]
    }).then((attendItem) => {
        res.send({
            'success': 'true',
            'message': attendItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': err
            });
        });
}

//delete AttendItem
const deleteAttendItem = async (req, res) => {
    console.log("Delete attendItem");
    AttendItem.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((attendItem) => {
            console.log(attendItem)
            res.status(200).send({
                'success': attendItem == 1 ? 'true' : 'false',
                'message': attendItem == 1 ? "Deleted Successfully" : "Delete Not Successful"
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
    createAttendItem,
    updateAttendItem,
    deleteAttendItem,
    getAllAttendItem,
    getAttendItemById
}