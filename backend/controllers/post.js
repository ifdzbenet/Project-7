
const database = require('../database');

// Call to bring all the information in the post table
exports.getAllPosts = (req, res, next) => {
    database.query(`SELECT postID, userID, datePost, title, body, image, multimedia, topicID, comments, likes, favs, 
    firstName, lastName, jobPosition, profilePicture, email, 
    topicName, amount_followers, added_date FROM post 
    LEFT JOIN user_info USING (userID) LEFT JOIN topics USING (topicID);`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

// Call to bring the information of a specific row inside the table
exports.getOnePost = (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT postID, userID, datePost, title, body, image, multimedia, topicID, comments, likes, favs, 
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

// Create a new row (post) inside the post table
exports.createPost = async (req, res, next) => {
    try{
        const userID = req.body.userID;
        const datePost = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const title = req.body.title;
        const body = req.body.body;
        //const image = req.file.filename; 
        const multimedia = req.body.multimedia;
        const topicID = req.body.topicID;
        if (req.file) {
            const image = req.file.filename; // imageUrl: url + '/images/' + req.file.filename,
            await database.query(`INSERT INTO post (userID, datePost, title, body, image, multimedia, topicID) 
            VALUES ('${userID}', '${datePost}', '${title}', '${body}', '${image}', '${multimedia}', '${topicID}');`);
            return res.status(200).send('ok')   
        } else {
            const image = req.body.image;
            await database.query(`INSERT INTO post (userID, datePost, title, body, image, multimedia, topicID) 
            VALUES ('${userID}', '${datePost}', '${title}', '${body}', '${image}', '${multimedia}', '${topicID}');`);
            return res.status(200).send('ok')   
        }
        
    }   catch {
        (error) => {
            console.log('no');
            return res.status(400).json({
                error: error
            });
        }
    }

    
};

// Take one of the rows inside the post table and make changes over the information
// Two routes: one brings a new file for the image field, the other accepts data without a new file (the image is not updated)
exports.updatePost = async (req, res, next) => {
    try{
        let id =  req.params.id
        const postID = req.body.postID;
        const title = req.body.title;
        const body = req.body.body;
         // imageUrl: url + '/images/' + req.file.filename,
        const topicID = req.body.topicID;
        if (req.file) {
            const image = req.file.filename;
            await database.query(`UPDATE post SET title='${title}',body='${body}',image='${image}',topicID='${topicID}'
            WHERE postID ='${postID}'`);
            return res.status(200).send('ok')   
        } else {
            const multimedia = req.body.multimedia;
            await database.query(`UPDATE post SET title='${title}',body='${body}', multimedia='${multimedia}', topicID='${topicID}' 
            WHERE postID ='${postID}'`);
            return res.status(200).send('ok')
        } 
    }   catch {
        (error) => {
            console.log('no');
            return res.status(400).json({
                error: error
            });
        }
    }
};

// Query to delete one row of the post table. The frontend has a prompt for the user to be sure of its deletion
exports.deletePost = async (req, res, next) => {
    try {
        let id =  req.params.id
        await database.query(`DELETE FROM post WHERE postID ='${id}'`);
        return res.status(200).send('post deleted') 
    } catch {
        (error) => {
            console.log('no');
            return res.status(400).json({
                error: error
            });
        }
    }
}