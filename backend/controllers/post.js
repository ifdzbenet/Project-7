
const database = require('../database');


exports.getAllPosts = (req, res, next) => {
    database.query(`SELECT postID, userID, datePost, title, body, image, topicID, comments, likes, favs, 
    firstName, lastName, jobPosition, profilePicture, email, 
    topicName, amount_followers, added_date FROM post 
    LEFT JOIN user_info USING (userID) LEFT JOIN topics USING (topicID);`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

exports.getOnePost = (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT postID, userID, datePost, title, body, image, topicID, comments, likes, favs, 
    firstName, lastName, jobPosition, profilePicture, email, 
    topicName, amount_followers, added_date FROM post 
    LEFT JOIN user_info USING (userID) LEFT JOIN topics USING (topicID)
    WHERE postID LIKE ${id}`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};


