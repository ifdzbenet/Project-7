
const database = require('../database');


exports.getAllPosts = (req, res, next) => {
    database.query(`SELECT * FROM post WHERE 1`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    //protect the user's password by deleting it before sending it back to the client
    return res.status(200).send(result)
    })   
};
/*
exports.getOnePost = (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT * FROM user_info WHERE userID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    //protect the user's password by deleting it before sending it back to the client
    delete result[0].password;
    return res.status(200).send(result)
    })   
};
*/

