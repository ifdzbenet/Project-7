
const database = require('../database');


exports.getAllTopics = (req, res, next) => {
    database.query(`SELECT * FROM topics WHERE 1`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};