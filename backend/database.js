const {createPool} = require('mysql');

const pool = createPool ({
    host: "localhost",
    user: "root",
    password: "laguzuaz",
    database: "groupomania",
    connectionLimit: 10,
});

pool.query(`select * from user_info`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return console.log(result);
});