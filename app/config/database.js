const Sequelize = require("sequelize");

// Order is 'database', 'username', 'password'
db = new Sequelize("gymapp", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


module.exports = db;