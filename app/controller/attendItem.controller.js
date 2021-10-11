const AttendItem = require("../model/attendItem.model");
const Attendance = require("../model/attendance.model");
const ScheduleItem = require("../model/scheduleItem.model");

//Register a AttendItem | guest
exports.createAttendItem = async (req, res) => {
    if (req.body) {
        console.log("Create attendItem");
        AttendItem.create(req.body)
            .then((attendItem) => {
                res.send({
                    'success': 'true',
                    'data': attendItem
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create AttendItem',
                'description': err
                });
            });
    }
}


//update AttendItem Details
exports.updateAttendItem = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        AttendItem.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((attendItem) => {
                res.status(200).send({
                    'success': attendItem[0] == 1 ? 'true' : 'false',
                    'data': attendItem[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update AttendItem',
                'description': err
                });
            });
    }
}


//get All AttendItem
exports.getAllAttendItem = (req, res) => {
    console.log("get All");
    AttendItem.findAll().then((attendItem) => {
        res.send({
            'success': 'true',
            'data': attendItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All AttendItem',
                'description': err
            });
        });
}

//get AttendItem By Id
exports.getAttendItemById = (req, res) => {
    console.log("get All");
    AttendItem.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Attendance
        }, {
            model: ScheduleItem
        }]
    }).then((attendItem) => {
        res.send({
            'success': 'true',
            'data': attendItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting AttendItem By ID',
                'description': err
            });
        });
}

//delete AttendItem
exports.deleteAttendItem = async (req, res) => {
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
                'data': attendItem == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete AttendItem',
                'description': err
            });
        });
}
