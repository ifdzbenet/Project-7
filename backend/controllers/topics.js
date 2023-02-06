
const database = require('../database');

exports.getAllTopics = (req, res, next) => {
    database.query(`SELECT * FROM topics WHERE 1`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

exports.getOneTopic = (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT postID, userID, datePost, title, body, image, topicID, topicName, comments, likes, favs, 
    firstName, lastName, jobPosition, profilePicture, email, topicName, amount_followers, added_date 
    FROM post LEFT JOIN user_info USING (userID) LEFT JOIN topics USING (topicID) 
    WHERE topicID LIKE ${id}`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};
