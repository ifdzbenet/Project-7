const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');


// Route for the user to get access to the database, create an account
exports.signup = async (req, res, next) => {
    try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const signUpDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const hash = await bcrypt.hash(password, 10); //hash to protect the user's password and save it instead of the real password
    await database.query(`INSERT INTO user_info (firstName, lastName, email, password, sign_up_date) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${signUpDate}');`);
    //jsonwebtoken to set an identification key and set it in the local storage  to keep the session on
    await database.query(`SELECT * FROM user_info WHERE email LIKE '${req.body.email}'`, (err, result, fields) =>{
        const token = jwt.sign(
            {userId: result[0].userID},
            '07061999tdis13022023',
            {expiresIn: '24h'});
            return res.status(200).json({
                userId: result[0].userID,
                token: token
            });})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something broke');
    }
};

// Route for the user to be able to log back in with their introduced credentials 
exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        await database.query(`SELECT * FROM user_info WHERE email LIKE '${email}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //bcrypt to compare the existing hashed password in the database
            bcrypt.compare(req.body.password, result[0].password, (error, valid) => {
                if (valid) {
                    
                    // jsonwebtoken to set an identification key and set it in the local storage to keep the session on
                    const token = jwt.sign(
                        {userId: result[0].userID},
                        '07061999tdis13022023',
                        {expiresIn: '24h'});
                        return res.status(200).json({
                            userId: result[0].userID,
                            token: token
                        });
                    //

                } else if (error) { 
                    return res.status(500).json({
                        error: error
                    });
                }
            });
            // A little piece of code to keep track of when the users are logging in
            const logInDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            database.query(`UPDATE user_info SET log_in_date ='${logInDate}';`);

            
            //
        })
    } catch (error) {
            console.log('the connection with the DB is altered')
            return res.status(500).json({
            error: error
        });
    }
};

// A route that allows the user to delete their account if desired. The interface has a prompt to make sure it's not a mistake
exports.deleteUser = async (req, res, next) => {
    try {
        let id =  req.params.id
        await database.query(`DELETE FROM post WHERE userID ='${id}'`);
        // Once the posts from the user are deleted, the user itself is removed from the database
        await database.query(`DELETE FROM user_info WHERE userID ='${id}'`);
        return res.status(200).json({
            ok: 'ok'});
    } catch (error) {
            console.log('the connection with the DB is altered')
            return res.status(500).json({
                error: error
        });
    }
};

// A route where the user can access to change their email to log in
exports.updateEmail = async (req, res, next) => {
    try {
        let id =  req.body.userID
        let newEmail = req.body.newEmail
        await database.query(`SELECT email FROM user_info WHERE userID LIKE '${id}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //
                if (req.body.email == result[0].email) {
                    database.query(`UPDATE user_info SET email='${newEmail}' WHERE userID ='${id}'`);
                    return res.status(200).send('ok')   
                } else if (error) { 
                    return res.status(500).json({
                        error: error
                    });
                }
            
            //
        })
    } catch (error) {
            console.log('the connection with the db is altered')
            return res.status(500).json({
            error: error
        });
    }
};

// A route where the user can change their password for their account. Everything gets re-hashed
// The interface has a prompt where the user has to enter their former password to change to their new one
exports.updatePassword = async (req, res, next) => {
    try {
        let id =  req.body.userID
        let newPW = req.body.newPW
        await database.query(`SELECT password FROM user_info WHERE userID LIKE '${id}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //bcrypt
            bcrypt.compare(req.body.password, result[0].password, async (error, valid) => {
                if (valid) {
                    const hash = await bcrypt.hash(newPW, 10);
                    database.query(`UPDATE user_info SET password='${hash}' WHERE userID ='${id}'`);
                    return res.status(200).send('ok')   
                } else if (error) { 
                    return res.status(500).json({
                        error: error
                    });
                }
            });
            //
        })
    } catch (error) {
            console.log('the connection with the db is altered')
            return res.status(500).json({
            error: error
        });
    }
};

// A route to collect all the data from the user info table
exports.userinfoall = async (req, res, next) => {
    database.query(`SELECT userID, firstName, lastName, jobPosition, profilePicture, email, is_logged, sign_up_date, log_in_date FROM user_info WHERE 1`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

// Call to bring the information of a specific row (user) in the user info table
exports.userinfo = async (req, res, next) => {
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

// A route to check if the logged user has read the post
exports.getReadStatus = async (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT read_status FROM user_info WHERE userID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

// A route that updates when the user enters the link to a post that has not been read before
// It sets the read status field into the former value, including a new addition to it
exports.sendReadStatus = async (req, res, next) => {
    try {
        let id =  req.params.id
        let update = req.body.update
        database.query(`UPDATE user_info SET read_status='${update}' WHERE userID='${id}'`)   
        //const read_status = req.body.readStatus;
        return res.status(200).send({
            its: 'ok'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Something broke');
    }
};

// A route where the user can update their personal information like their name, job position and profile picture
// This route is not the same as the password or email change routes
exports.updateProfile = async (req, res, next) => {
    try{
        let id =  req.params.id
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const jobPosition = req.body.jobPosition;
         // imageUrl: url + '/images/' + req.file.filename,
        if (req.file) {
            const profilePicture = req.file.filename;
            await database.query(`UPDATE user_info SET firstName='${firstName}', lastName='${lastName}', 
            jobPosition='${jobPosition}', profilePicture='${profilePicture}' WHERE userID = '${id}'`);
            return res.status(200).send('ok')   
        } else {
            //const profilePicture = "placeholder-user-icon.png";
            await database.query(`UPDATE user_info SET firstName='${firstName}', lastName='${lastName}', 
            jobPosition='${jobPosition}' WHERE userID = '${id}'`);
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