const ScheduleItem = require("../model/scheduleItem.model");
const Schedule = require("../model/schedule.model");
const Attendance = require("../model/attendance.model");
const ServiceType = require("../model/serviceType.model");

//Register a ScheduleItem | guest
const createScheduleItem = async (req, res) => {
    if (req.body) {
        console.log("Create scheduleItem");
        ScheduleItem.create(req.body)
            .then((scheduleItem) => {
                res.send({
                    'success': 'true',
                    'data': scheduleItem
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Create ScheduleItem',
                    'description': err
                });
            });
    }
}


//update ScheduleItem Details
const updateScheduleItem = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;
        ScheduleItem.update(req.body, {
            where: {
                id: id,
            },
        })
            .then((scheduleItem) => {
                res.status(200).send({
                    'success': scheduleItem[0] == 1 ? 'true' : 'false',
                    'data': scheduleItem[0] == 1 ? "Updated Successfully" : "Update Not Successful"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    'success': 'false',
                    'message': 'Error in Update ScheduleItem',
                    'description': err
                });
            });
    }
}


//get All ScheduleItem
const getAllScheduleItem = (req, res) => {
    console.log("get All");
    ScheduleItem.findAll().then((scheduleItem) => {
        res.send({
            'success': 'true',
            'data': scheduleItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting All ScheduleItem',
                'description': err
            });
        });
}

//get ScheduleItem By Id
const getScheduleItemById = (req, res) => {
    console.log("get All");
    ScheduleItem.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Schedule
        }, {
            model: ServiceType
        }]
    }).then((scheduleItem) => {
        res.send({
            'success': 'true',
            'data': scheduleItem
        });
    })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Getting ScheduleItem By ID',
                'description': err
            });
        });
}

//delete ScheduleItem
const deleteScheduleItem = async (req, res) => {
    console.log("Delete scheduleItem");
    ScheduleItem.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((scheduleItem) => {
            console.log(scheduleItem)
            res.status(200).send({
                'success': scheduleItem == 1 ? 'true' : 'false',
                'data': scheduleItem == 1 ? "Deleted Successfully" : "Delete Not Successful"
            });
        })
        .catch((err) => {
            res.status(400).send({
                'success': 'false',
                'message': 'Error in Delete ScheduleItem',
                'description': err
            });
        });
}

module.exports = {
    createScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    getAllScheduleItem,
    getScheduleItemById
}