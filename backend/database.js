const mysql = require('mysql');


module.exports = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "laguzuaz",
    database: "groupomania",
    connectionLimit: 10,
});;