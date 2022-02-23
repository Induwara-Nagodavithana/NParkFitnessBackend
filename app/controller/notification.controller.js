const admin = require("../config/firebase-config");

// Send a message to devices subscribed to the provided topic.
exports.sendNotifications = (req, res) => {
  console.log("Delete gym");
  var payload = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };
  admin
    .messaging()
    .sendToTopic(req.body.topic, payload)
    .then((response) => {
      console.log("Sent successfully.\n");
      console.log(response);
      res.send({
        success: "true",
        data: response,
      });
    })
    .catch((error) => {
      console.log("Sent failed.\n");
      console.log(error);
      res.status(400).send({
        success: "false",
        message: "Error in Create Notification",
        description: error.message,
      });
    });
};
