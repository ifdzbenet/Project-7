
const database = require('../database');

exports.userPostInfo = async (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT userID, posts, fav_posts, date_fav, read_status, date_read, followed_topics FROM user_post_info WHERE userID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};



exports.sendReadStatus = async (req, res, next) => {
    try {
        let id =  req.params.id
        let update = req.body.update
        database.query(`UPDATE user_post_info SET read_status='${update}' WHERE userID='${id}'`)   
        //const read_status = req.body.readStatus;
        return res.status(200).send({
            todo: 'ok'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Something broke');
    }
};