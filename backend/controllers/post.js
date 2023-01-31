
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

exports.createPost = async (req, res, next) => {
    try{
        const userID = req.body.userID;
        const datePost = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const title = req.body.title;
        const body = req.body.body;
        const image = req.file.filename; // imageUrl: url + '/images/' + req.file.filename,
        const topicID = req.body.topicID;
        await database.query(`INSERT INTO post (userID, datePost, title, body, image, topicID) VALUES ('${userID}', '${datePost}', '${title}', '${body}', '${image}', '${topicID}');`);
        return res.status(200).send('ok')   
    }   catch {
        (error) => {
            console.log('no');
            return res.status(400).json({
                error: error
            });
        }
    }
};
