var mysql = require("mysql");
var config = require(__dirname + "/../config/config.json")[process.env.NODE_ENV];

var connection = mysql.createConnection({
  port: config.port,
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
