var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors')
var fireAuth = require('./app/auth/firebaseAuth')
const db = require('./app/config/database');
const PORT = process.env.PORT || 3005;
const ApiRouter = require('./app/route/api.route')
const AuthRouter = require('./app/route/auth.route')
const PayHereRouter = require('./app/route/payhere.route')



//Database
db.sync().then(()=>{
    console.log('Database Connected')
});

// var users = require("./routes/users");
// var api = require("./routes/api");
// var open = require("./routes/open");

//Init App
var app = express();



//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cors())


//Express Validater

app.get("/", (req, res) => {
  res.send("Hello This Is NParkFitness Server!");
});
// app.use("/", fireAuth.decodeToken , open);

app.use("/api",ApiRouter);
app.use("/auth",AuthRouter);
app.use("/payhere",PayHereRouter);

//Set Port
app.set("port", PORT);

app.listen(app.get("port"), function () {
  console.log("Server start on port " + app.get("port"));
});