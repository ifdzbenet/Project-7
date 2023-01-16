const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');

exports.signup = async (req, res, next) => {
    try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    await database.query(`INSERT INTO testing (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}')`);
    res.status(200).json('All good!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something broke');
    }
};

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        await database.query(`SELECT * FROM testing WHERE email LIKE '${email}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //return res.status(200).send(result)
            //bcrypt
            bcrypt.compare(req.body.password, result[0].password, (error, valid) => {
                if (valid) {
                    // jsonwebtoken
                    const token = jwt.sign(
                        {userId: result[0].testID},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'});
                        //localStorage.setItem('token', token);
                        //console.log(localStorage.getItem('token') );
                        return res.status(200).json({
                            userId: result[0].testID,
                            token: token
                        });
                    //

                } else if (error) { 
                    return res.status(500).json({
                        error: error
                    });
                }
            })
            
            //
        })
    } catch (error) {
            console.log('the connection with the db is cucked')
            return res.status(500).json({
            error: error
        });
    }
};

exports.userinfo = async (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT * FROM testing WHERE testID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
};