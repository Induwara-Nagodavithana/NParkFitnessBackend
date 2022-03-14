const Sequelize = require("sequelize");

// Order is 'database', 'username', 'password'
db = new Sequelize("gymApp", "admin", "Wasd#2731", {
  host: "database-1.clwjrzzurrw6.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


module.exports = db;