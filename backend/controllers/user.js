const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');

exports.signup = async (req, res, next) => {
    try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const signUpDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const hash = await bcrypt.hash(password, 10);
    await database.query(`INSERT INTO user_info (firstName, lastName, email, password, sign_up_date) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${signUpDate}');`);
    //jsonwebtoken
    await database.query(`SELECT * FROM user_info WHERE email LIKE '${req.body.email}'`, (err, result, fields) =>{
        const token = jwt.sign(
            {userId: result[0].userID},
            'RANDOM_TOKEN_SECRET',
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

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        await database.query(`SELECT * FROM user_info WHERE email LIKE '${email}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //bcrypt
            bcrypt.compare(req.body.password, result[0].password, (error, valid) => {
                if (valid) {
                    
                    // jsonwebtoken
                    const token = jwt.sign(
                        {userId: result[0].userID},
                        'RANDOM_TOKEN_SECRET',
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
            const logInDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            database.query(`UPDATE user_info SET log_in_date ='${logInDate}';`);

            
            //
        })
    } catch (error) {
            console.log('the connection with the db is altered')
            return res.status(500).json({
            error: error
        });
    }
};

exports.userinfoall = async (req, res, next) => {
    database.query(`SELECT userID, firstName, lastName, jobPosition, profilePicture, email, is_logged, sign_up_date, log_in_date FROM user_info WHERE 1`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};

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

