const admin = require("../config/firebase-config");
const User = require("../model/user.model");

class FireAuth {
  async decodeToken(req, res, next) {
    if (!req.headers.authorization)
      return res.status(400).send({
        success: "false",
        message: "Error in Authorization",
        description: "Token is missing",
      });
    const token = req.headers.authorization.split(" ")[1];
    console.log("token");
    console.log(token);
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        console.log("decodeValue");
        User.findOne({
          where: { fireUID: req.user.uid },
          attributes: ["type"],
        }).then((user) => {
          if (!user) {
            console.log("User Not Found");
            return res.status(500).send({
              success: "false",
              message: "Error in Authorization",
              description: "Cannot find the user",
            });
          }
          console.log(user);
          req.user.type = user.type;
          console.log(decodeValue);
          return next();
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        success: "false",
        message: "Error in Authorization",
        description: e.message,
      });
    }
  }
}

module.exports = new FireAuth();
